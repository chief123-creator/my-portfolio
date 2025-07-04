/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00d4ff',
        'neon-purple': '#a855f7',
        'neon-cyan': '#22d3ee',
        'neon-lime': '#84cc16',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'typewriter': 'typewriter 4s steps(40) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.neon-blue), 0 0 10px theme(colors.neon-blue), 0 0 15px theme(colors.neon-blue)' },
          '100%': { boxShadow: '0 0 10px theme(colors.neon-blue), 0 0 20px theme(colors.neon-blue), 0 0 30px theme(colors.neon-blue)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        typewriter: {
          '0%, 50%': { width: '0' },
          '100%': { width: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px theme(colors.neon-cyan), 0 0 10px theme(colors.neon-cyan)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 20px theme(colors.neon-cyan), 0 0 30px theme(colors.neon-cyan)',
            transform: 'scale(1.05)' 
          }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}