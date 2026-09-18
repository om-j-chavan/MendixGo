/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#4b4b4b',
          950: '#05050c',
          900: '#0a0a16',
          850: '#0d0d1f',
          800: '#12122a',
          700: '#1a1a38',
          600: '#242452',
        },
        duo: {
          green: '#58cc02',
          blue: '#1cb0f6',
          red: '#ff4b4b',
          orange: '#ff9600',
          gold: '#ffc800',
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
          magenta: '#d946ef',
          lime: '#a3e635',
          green: '#22c55e',
          amber: '#f59e0b',
          red: '#ef4444',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34,211,238,.45), 0 0 4px rgba(34,211,238,.7)',
        'glow-purple': '0 0 20px rgba(168,85,247,.45), 0 0 4px rgba(168,85,247,.7)',
        'glow-pink': '0 0 20px rgba(236,72,153,.45), 0 0 4px rgba(236,72,153,.7)',
        'glow-lime': '0 0 20px rgba(163,230,53,.45), 0 0 4px rgba(163,230,53,.7)',
        'glow-amber': '0 0 22px rgba(245,158,11,.5), 0 0 6px rgba(245,158,11,.8)',
        'glow-soft': '0 0 30px rgba(59,130,246,.25)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '.85', filter: 'brightness(1.25)' },
        },
        flamewiggle: {
          '0%,100%': { transform: 'rotate(-4deg) scale(1)' },
          '50%': { transform: 'rotate(4deg) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        popin: {
          '0%': { transform: 'scale(.8)', opacity: '0' },
          '70%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gridpan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        flamewiggle: 'flamewiggle 1.4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        popin: 'popin .45s cubic-bezier(.2,.9,.3,1.3) both',
        gridpan: 'gridpan 6s linear infinite',
      },
    },
  },
  plugins: [],
}
