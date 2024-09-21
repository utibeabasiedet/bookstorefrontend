import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			green: {
			  500: "#24AE7C",
			  600: "#0D2A1F",
			},
			blue: {
			  500: "#79B5EC",
			  600: "#152432",
			},
			red: {
			  500: "#F37877",
			  600: "#3E1716",
			  700: "#F24E43",
			},
			light: {
			  200: "#E8E9E9",
			},
			dark: {
			  200: "#0D0F10",
			  300: "#131619",
			  400: "#1A1D21",
			  500: "#363A3D",
			  600: "#76828D",
			  700: "#ABB8C4",
			},
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
