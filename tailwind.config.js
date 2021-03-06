module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "hero-pattern": "url('/src/assets/pattern-bg.png')",
      },
    },
  },
  plugins: [],
}
