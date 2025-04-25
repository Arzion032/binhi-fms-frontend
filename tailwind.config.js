/** @type {import('tailwindcss').Config} */


export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
	  extend: {
		colors: {
			binhi: "#F8FCF8", // background color
			binhigreen: "#4CAE4F", // custom green for Binhi
		  },
		fontFamily: {
		  inter: ['Inter', 'sans-serif'],
		},
	  },
	},
	plugins: [require("daisyui")],
	daisyui: {
	  themes: ["light"], 
	},
  }