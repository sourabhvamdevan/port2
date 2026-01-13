/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        accent: "#06b6d4",
        neon: "#ff6ec7"
      },
      backgroundImage: {
        "vibrant-gradient":
          "linear-gradient(135deg,#7c3aed 0%,#06b6d4 50%,#ff6ec7 100%)"
      },
      boxShadow: {
        "neon-lg":
          "0 10px 30px rgba(124,58,237,0.12), 0 2px 6px rgba(6,182,212,0.06)"
      }
    }
  },
  plugins: []
};

