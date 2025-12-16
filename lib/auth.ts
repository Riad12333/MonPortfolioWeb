import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await connectDB();

                // Select passwordHash explicitly because it's set to select: false
                const user = await User.findOne({ email: credentials.email }).select('+passwordHash');

                if (!user) {
                    throw new Error("No user found with this email");
                }

                if (user.authProvider === 'google' && !user.passwordHash) {
                    throw new Error("Please sign in with Google");
                }

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash || "");

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            }
        })
    ],
    pages: {
        signIn: '/sign-in',
        // signOut: '/auth/signout',
        // error: '/auth/error', 
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await connectDB();
                const existingUser = await User.findOne({ email: user.email });

                if (existingUser) {
                    // Link Google Account if not linked (e.g. created via email but same email)
                    if (!existingUser.googleId) {
                        existingUser.googleId = account.providerAccountId;
                        if (user.image && !existingUser.image) {
                            existingUser.image = user.image;
                        }
                        if (existingUser.authProvider === 'email') {
                            // Optional: Switch provider or keep as 'email' but linked? 
                            // Spec says: "Associer googleId s'il est vide"
                        }
                        await existingUser.save();
                    }
                    return true;
                } else {
                    // Create new Google User
                    // Generate username from email
                    let baseUsername = user.email!.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
                    let username = baseUsername;

                    // Ensure username is unique
                    let counter = 1;
                    while (await User.findOne({ username })) {
                        username = `${baseUsername}${counter}`;
                        counter++;
                    }

                    // Default Trial logic
                    const trialDefaults = {
                        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        subscriptionStatus: 'trial',
                        subscriptionPlan: null,
                        sectionOrder: ['Services', 'Experience', 'Skills', 'Projects', 'Education', 'Certificates', 'Languages'],
                        themeSettings: { bgcolor: 'bg-slate-950', themeId: 'theme-minimal' }
                    };

                    const newUser = await User.create({
                        email: user.email,
                        name: user.name,
                        username,
                        fullName: user.name,
                        image: user.image,
                        authProvider: 'google',
                        googleId: account.providerAccountId,
                        ...trialDefaults
                    });

                    // Attach the new ID to the user object passed to next callbacks
                    user.id = newUser._id.toString();
                    return true;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                // We'll fetch fresh role/sub status in session or here.
                // It's safer to fetch minimal data here.
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // Fetch fresh subscription details for the session
                // This ensures if subscription changes, session reflects it on refresh
                try {
                    await connectDB();
                    // Find by email instead of ID to avoid ObjectId cast errors with Google IDs
                    const dbUser = await User.findOne({ email: session.user.email }).select('_id subscriptionStatus subscriptionPlan trialEndsAt');
                    if (dbUser) {
                        // @ts-ignore
                        session.user.id = dbUser._id.toString();
                        // @ts-ignore
                        session.user.subscriptionStatus = dbUser.subscriptionStatus;
                        // @ts-ignore
                        session.user.subscriptionPlan = dbUser.subscriptionPlan;
                    }
                } catch (e) {
                    console.error("Session fetch error", e);
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
