
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, select: false }, // Nullable if Google-only
    authProvider: { type: String, enum: ['email', 'google'], default: 'email' },
    googleId: { type: String, sparse: true }, // Sparse unique index if needed

    name: String,
    image: String,

    // Profile specific fields
    username: { type: String, unique: true, sparse: true },
    fullName: String,
    language: { type: String, default: 'English' },
    country: String,
    phone: String,
    specialization: String,
    about: String,
    cvUrl: String,
    skills: [String],
    socials: {
        linkedin: String,
        github: String,
        twitter: String,
        youtube: String,
        instagram: String,
        website: String,
        // Allow flexible additions
        type: Map,
        of: String
    },

    // Detailed Profile Fields (Arrays of sub-documents/objects)
    services: [Schema.Types.Mixed],
    education: [Schema.Types.Mixed],
    experience: [Schema.Types.Mixed],
    projects: [Schema.Types.Mixed],
    certificates: [Schema.Types.Mixed],
    spokenLanguages: [Schema.Types.Mixed],

    // Platform & Subscription
    sectionOrder: { type: [String], default: ['Services', 'Experience', 'Skills', 'Projects', 'Education', 'Certificates', 'Languages'] },
    themeSettings: {
        bgcolor: { type: String, default: 'bg-slate-950' },
        themeId: { type: String, default: 'theme-minimal' }
    },
    portfolioUrl: String,

    // Subscription Logic
    trialEndsAt: { type: Date },
    subscriptionStatus: { type: String, enum: ['trial', 'active', 'expired', 'canceled'], default: 'trial' },
    subscriptionPlan: { type: String, enum: ['monthly', 'fourMonths', 'yearly'], default: null },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Prevent overwrite of model during hot reload
const User = models.User || model('User', UserSchema);

export default User;
