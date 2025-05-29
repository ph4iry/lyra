const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          "50": "#F3F4F6",
          "100": "#E5E7EB",
          "200": "#373737",
          "300": "#6B6B6B",
          "400": "#4B5563",
          "500": "#374151",
          "600": "#1F2937",
          "700": "#111827",
          "800": "#1E1E1E"
        },
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        sans: ['var(--font-instrument)', 'sans-serif'],
        fancy: ['var(--font-instrument-serif)', 'serif'],
      }
    },
  },
  plugins: [],
}
