module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        '"M PLUS Rounded 1c"',
        '"Hiragino Kaku Gothic ProN"',
        '"ヒラギノ角ゴ ProN W3"',
        "メイリオ",
        "Meiryo",
        "Avenir",
        "Modern",
        "Arial",
        "sans-serif",
      ],
      logo: ["Raleway"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
