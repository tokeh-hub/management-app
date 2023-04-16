module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif']
      },
      colors: {
        'gray-1': '#828FA3',
        'gray-2': '#F4F7FD',
        'gray-3': '#E4EBFA',
        'gray-4': 'AFB6B9',
        'gray-5': '#3E3F4E',
        'gray-6': '#2B2C37',
        'gray-7': '#20212C',
        'gray-8': '#000112',
        'purple-1': '#635FC7',
        'purple-2': '#A8A4FF',
      },
      screens: {
        'xs': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      }
    }
    

  },
  plugins: [],
}