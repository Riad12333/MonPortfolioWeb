'use client';

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Background Shape */}
                <rect
                    x="4"
                    y="4"
                    width="32"
                    height="32"
                    rx="10"
                    fill="url(#logo-grad)"
                    className="drop-shadow-lg"
                />

                {/* Accent Shape (Glass effect) */}
                <path
                    d="M12 12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V28C28 29.1046 27.1046 30 26 30H14C12.8954 30 12 29.1046 12 28V12Z"
                    fill="white"
                    fillOpacity="0.15"
                />

                {/* Inner stylized 'P' or symbol */}
                <path
                    d="M16 16V24M16 16H22C24.2091 16 26 17.7909 26 20C26 22.2091 24.2091 24 22 24H16M16 20H22"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="logo-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl -z-10 rounded-full animate-pulse" />
        </div>
    );
}
