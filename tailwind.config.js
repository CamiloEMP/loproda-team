module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,html}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
