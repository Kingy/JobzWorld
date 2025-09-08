/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebfe',
          500: '#2E5AAC',
          600: '#285399',
          700: '#1e3a73',
          900: '#1a2951',
        },
        secondary: {
          50: '#f0fcff',
          100: '#e0f8fe',
          500: '#4FB3D9',
          600: '#3da5c7',
          700: '#2a82a3',
        },
        grey: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',    // 4px
        '2': '0.5rem',     // 8px
        '3': '0.75rem',    // 12px
        '4': '1rem',       // 16px
        '6': '1.5rem',     // 24px
        '8': '2rem',       // 32px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
      },
      borderRadius: {
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.5rem', // 8px
        'lg': '0.75rem',   // 12px
      }
    },
  },
  plugins: [],
};
