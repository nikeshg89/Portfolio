/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: '#06080f',
                'dark-2': '#0d1117',
                'dark-3': '#111827',
                primary: '#818cf8',       // indigo/violet
                secondary: '#a78bfa',     // purple
                accent: '#38bdf8',        // sky blue
                neon: '#c084fc',          // neon purple
                glass: 'rgba(255, 255, 255, 0.04)',
                'glass-hover': 'rgba(255, 255, 255, 0.08)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(129,140,248,0.15), transparent)',
            },
            animation: {
                'blob': 'blob 10s infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(40px, -60px) scale(1.15)' },
                    '66%': { transform: 'translate(-25px, 25px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-18px)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(129,140,248,0.4)' },
                    '50%': { boxShadow: '0 0 35px rgba(167,139,250,0.7)' },
                },
            },
            dropShadow: {
                'glow': '0 0 12px rgba(129,140,248,0.6)',
                'glow-lg': '0 0 24px rgba(167,139,250,0.7)',
            },
        },
    },
    plugins: [],
}
