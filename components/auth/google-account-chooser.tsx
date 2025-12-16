'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { UserCircle2, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Step = 'chooser' | 'email' | 'password' | 'recovery';
interface GoogleAccountChooserProps {
    mode?: 'signin' | 'signup';
}

export function GoogleAccountChooser({ mode = 'signin' }: GoogleAccountChooserProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<Step>('chooser');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For signup
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [recoveryMessage, setRecoveryMessage] = useState('');

    // Ensure we are in the right flow if "chooser" step is skipped or we want to force explicit entry
    // But for now, we start at 'chooser' to let user pick Google or Email.

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await signIn('google', { callbackUrl: '/' });
    };

    const handleEmailNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStep('password');
            setError('');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            // If they clicked "Forgot Password" before entering an email (e.g. at password step), keep email if present, else wait for input in recovery step.
            setStep('recovery');
            return;
        }

        // Go to recovery view with pre-filled email
        setStep('recovery');
    };

    const submitRecovery = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setRecoveryMessage('');

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!res.ok) throw new Error('Failed to send reset link');

            setRecoveryMessage('Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
        } catch (err) {
            setError('Impossible d\'envoyer le mail. Réessayez plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (mode === 'signup') {
                // Register Flow
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Registration failed');
                }

                // Auto login after register
                const result = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    throw new Error(result.error);
                }

                router.push('/');

            } else {
                // Login Flow
                const result = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    throw new Error("Invalid credentials");
                }

                router.push('/');
            }
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    // --- VIEW 1: ACCOUNT CHOOSER ---
    if (step === 'chooser') {
        return (
            <div className="bg-white rounded-[28px] p-10 w-full max-w-[448px] mx-auto shadow-sm min-h-[500px] flex flex-col font-sans transition-all duration-300">
                <div className="flex flex-col items-center mb-8">
                    <GoogleLogo />
                    <h1 className="text-2xl text-slate-900 font-normal mb-2 text-center">Sélectionnez un compte</h1>
                    <p className="text-sm text-slate-600 text-center">
                        Accéder à l'application <span className="text-blue-600 font-medium cursor-pointer">MonPortfolioWeb.vercel.app</span>
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-full transition-colors w-full text-left border-b border-slate-100/50"
                        disabled={isLoading}
                    >
                        <div className="relative w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 p-2">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-slate-900 font-medium text-sm truncate">Se connecter avec Google</span>
                        </div>
                    </button>


                    <button
                        onClick={() => setStep('email')}
                        className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-full transition-colors w-full text-left"
                        disabled={isLoading}
                    >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                            <UserCircle2 className="w-7 h-7 text-slate-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-medium text-sm">Se connecter avec un e-mail</span>
                        </div>
                    </button>
                </div>

                <Footer />
            </div>
        );
    }

    // --- VIEW 2: EMAIL INPUT ---
    if (step === 'email') {
        return (
            <div className="bg-white rounded-[28px] p-10 w-full max-w-[448px] mx-auto shadow-sm min-h-[500px] flex flex-col font-sans transition-all duration-300">
                <div className="flex flex-col items-center mb-8">
                    <GoogleLogo />
                    <h1 className="text-2xl text-slate-900 font-normal mb-2 text-center">
                        {mode === 'signup' ? 'Créer un compte' : 'Connexion'}
                    </h1>
                    <p className="text-base text-slate-900 text-center mb-8">
                        Accéder à l'application <span className="text-blue-600 font-medium">MonPortfolioWeb.vercel.app</span>
                    </p>
                </div>

                <form onSubmit={handleEmailNext} className="flex-1 flex flex-col">
                    <div className="group relative mb-2">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full h-[56px] rounded border border-slate-300 px-3 pt-4 pb-2 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                            id="emailInput"
                            placeholder=" "
                        />
                        <label
                            htmlFor="emailInput"
                            className="pointer-events-none absolute left-3 top-4 text-base text-slate-500 transition-all duration-200 ease-out bg-white px-1 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-[-8px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
                        >
                            Adresse e-mail
                        </label>
                    </div>

                    {mode === 'signin' && (
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-600 text-sm font-medium text-left mb-10 hover:text-blue-700 rounded-sm w-fit"
                        >
                            Adresse e-mail oubliée ?
                        </button>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-8">
                        <button type="button" onClick={() => setStep('chooser')} className="text-blue-600 font-medium text-sm hover:bg-blue-50 px-4 py-2 rounded">
                            Retour
                        </button>
                        <button
                            type="submit"
                            className="bg-[#0b57d0] text-white font-medium px-6 py-2 rounded-full hover:bg-[#0b57d0]/90 transition-colors shadow-sm"
                        >
                            Suivant
                        </button>
                    </div>
                </form>

                <Footer />
            </div>
        );
    }

    // --- VIEW 3: PASSWORD INPUT (AND NAME IF REGISTER) ---
    if (step === 'password') {
        return (
            <div className="bg-white rounded-[28px] p-10 w-full max-w-[448px] mx-auto shadow-sm min-h-[500px] flex flex-col font-sans transition-all duration-300">
                <div className="flex flex-col items-center mb-6 relative">
                    <GoogleLogo />
                    <h1 className="text-2xl text-slate-900 font-normal mb-2 text-center">Bienvenue</h1>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-full px-1 pr-4 py-1 mt-2 mb-2 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setStep('email')}>
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                            {email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-slate-700 font-medium">{email}</span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                </div>

                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuthAction} className="flex-1 flex flex-col">

                    {/* Name Input for Signup */}
                    {mode === 'signup' && (
                        <div className="group relative mb-4">
                            <input
                                type="text"
                                required
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer w-full h-[56px] rounded border border-slate-300 px-3 pt-4 pb-2 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                                id="nameInput"
                                placeholder=" "
                            />
                            <label
                                htmlFor="nameInput"
                                className="pointer-events-none absolute left-3 top-4 text-base text-slate-500 transition-all duration-200 ease-out bg-white px-1 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-[-8px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
                            >
                                Nom complet
                            </label>
                        </div>
                    )}

                    <div className="group relative mb-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            autoFocus={mode === 'signin'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer w-full h-[56px] rounded border border-slate-300 px-3 pt-4 pb-2 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                            id="passwordInput"
                            placeholder=" "
                        />
                        <label
                            htmlFor="passwordInput"
                            className="pointer-events-none absolute left-3 top-4 text-base text-slate-500 transition-all duration-200 ease-out bg-white px-1 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-[-8px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
                        >
                            Saisissez votre mot de passe
                        </label>
                    </div>

                    <div className="flex items-center mb-8">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showPass"
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPass" className="ml-3 text-sm text-slate-900 cursor-pointer">Afficher le mot de passe</label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <button type="button" onClick={handleForgotPassword} className="text-blue-600 font-medium text-sm hover:bg-blue-50 px-4 py-2 rounded">
                            {mode === 'signin' ? 'Mot de passe oublié ?' : ''}
                        </button>
                        <button
                            type="submit"
                            className="bg-[#0b57d0] text-white font-medium px-6 py-2 rounded-full hover:bg-[#0b57d0]/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (mode === 'signup' ? 'Création...' : 'Connexion...') : (mode === 'signup' ? 'S\'inscrire' : 'Suivant')}
                        </button>
                    </div>
                </form>

                <Footer />
            </div>
        );
    }

    // --- VIEW 4: RECOVERY ---
    if (step === 'recovery') {
        return (
            <div className="bg-white rounded-[28px] p-10 w-full max-w-[448px] mx-auto shadow-sm min-h-[500px] flex flex-col font-sans transition-all duration-300">
                <div className="flex flex-col items-center mb-8">
                    <GoogleLogo />
                    <h1 className="text-2xl text-slate-900 font-normal mb-2 text-center">Récupération de compte</h1>
                    <p className="text-base text-slate-900 text-center mb-8">
                        Renseignez votre e-mail pour recevoir un lien de réinitialisation.
                    </p>
                </div>

                {recoveryMessage ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-green-600 text-center mb-8 px-4 py-3 bg-green-50 rounded-lg">
                            {recoveryMessage}
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep('email')}
                            className="bg-[#0b57d0] text-white font-medium px-6 py-2 rounded-full hover:bg-[#0b57d0]/90 transition-colors shadow-sm"
                        >
                            Revenir à la connexion
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submitRecovery} className="flex-1 flex flex-col">
                        <div className="group relative mb-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer w-full h-[56px] rounded border border-slate-300 px-3 pt-4 pb-2 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                                id="resetEmailInput"
                                placeholder=" "
                            />
                            <label
                                htmlFor="resetEmailInput"
                                className="pointer-events-none absolute left-3 top-4 text-base text-slate-500 transition-all duration-200 ease-out bg-white px-1 peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-[-8px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
                            >
                                Adresse e-mail
                            </label>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm mt-2">{error}</div>
                        )}

                        <div className="flex items-center justify-between mt-auto pt-8">
                            <button type="button" onClick={() => setStep('email')} className="text-blue-600 font-medium text-sm hover:bg-blue-50 px-4 py-2 rounded">
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="bg-[#0b57d0] text-white font-medium px-6 py-2 rounded-full hover:bg-[#0b57d0]/90 transition-colors shadow-sm"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </div>
                    </form>
                )}

                <Footer />
            </div>
        );
    }

    return null;
}

function GoogleLogo() {
    return (
        <div className="mb-4">
            <svg className="w-12 h-12" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    style={{ color: '#4285F4' }}
                />
                <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    style={{ color: '#34A853' }}
                />
                <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    style={{ color: '#FBBC05' }}
                />
                <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    style={{ color: '#EA4335' }}
                />
            </svg>
        </div>
    );
}

function Footer() {
    return (
        <div className="mt-8 pt-6 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-4 hover:bg-slate-100 px-3 py-2 rounded cursor-pointer">
                <span>Français (France)</span>
                <ChevronDown className="w-3 h-3" />
            </div>

            <div className="flex gap-4">
                <span className="cursor-pointer hover:text-slate-700">Aide</span>
                <span className="cursor-pointer hover:text-slate-700">Confidentialité</span>
                <span className="cursor-pointer hover:text-slate-700">Conditions</span>
            </div>
        </div>
    );
}
