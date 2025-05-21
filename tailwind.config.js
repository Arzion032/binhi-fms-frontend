/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	  "./src/**/*.{html,js,ts,jsx,tsx}",
	  "app/**/*.{ts,tsx}",
	  "components/**/*.{ts,tsx}"
	],
	theme: {
	  extend: {
		colors: {
		  binhi: "#F8FCF8", // background color
		  binhigreen: "#4CAE4F", // custom green for Binhi
		  "app-accent": "var(--app-accent)",
		  "app-background": "var(--app-background)",
		  "app-primary": "var(--app-primary)",
		  "app-secondary": "var(--app-secondary)",
		  blue: "var(--blue)",
		  "dark-gray": "var(--dark-gray)",
		  gray: "var(--gray)",
		  red: "var(--red)",
		  text: "var(--text)",
		  white: "var(--white)",
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))"
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))"
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))"
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))"
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))"
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))"
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))"
		  }
		},
		fontFamily: {
		  inter: ['Inter', 'sans-serif'],
		  body: "var(--body-font-family)",
		  "body-heavy": "var(--body-heavy-font-family)",
		  "body-small": "var(--body-small-font-family)",
		  "body-small-heavy": "var(--body-small-heavy-font-family)",
		  "heading-1": "var(--heading-1-font-family)",
		  "heading-2": "var(--heading-2-font-family)",
		  "heading-3": "var(--heading-3-font-family)",
		  sans: [
			"ui-sans-serif",
			"system-ui",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
			'"Noto Color Emoji"'
		  ]
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)"
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" }
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" }
		  }
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out"
		},
		container: {
		  center: true,
		  padding: "2rem",
		  screens: {
			"2xl": "1400px"
		  }
		}
	  }
	},
	plugins: [require("daisyui")],
	darkMode: ["class"],
	daisyui: {
	  themes: ["light"]
	}
  };


