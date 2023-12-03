/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      text: (theme) => ({
        'text-color': `bg-[radial-gradient(ellipse at center,_var(--tw-gradient-stops)) from-green-400 via-blue-700 to-cyan-600]`,
        'text-nav': `bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-green-500 via-emerald-300 to-green-800`
      }),
    },
  },
  plugins: [],
}
