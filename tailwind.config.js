/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      'body': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui',
        // other fallback fonts
      ],
      'sans': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui',
        // other fallback fonts
      ]
    }
  },
  plugins: [],
}

