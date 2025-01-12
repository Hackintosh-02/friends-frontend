/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'], // Enable class-based dark mode
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}', // Include your source files
		'./node_modules/shadcn-ui/**/*.{js,jsx,ts,tsx}' // Include Shadcn components
	],
	theme: {
		extend: {
			borderRadius: {
				lg: '12px',
				md: '10px',
				sm: '8px'
			},
			colors: {
				background: {
					DEFAULT: '#f4f5fb', // Light mode background
					dark: '#04050b' // Dark mode background
				},
				foreground: {
					DEFAULT: '#0d111c', // Light mode text
					dark: '#e3e7f2' // Dark mode text
				},
				card: {
					DEFAULT: '#FFFFFF', // Light mode card background
					dark: '#121421' // Dark mode card background
				},
				muted: {
					DEFAULT: '#6B7280', // Light mode muted text
					dark: '#A1A1AA' // Dark mode muted text
				},
				primary: {
					DEFAULT: '#1b3279', // Light mode primary color
					dark: '#869de4' // Dark mode primary color
				},
				secondary: {
					DEFAULT: '#7392ed', // Light mode secondary color
					dark: '#12318c' // Dark mode secondary color
				},
				accent: {
					DEFAULT: '#0a3fdb', // Light mode accent color
					dark: '#2458f5' // Dark mode accent color
				},
				destructive: {
					DEFAULT: '#EF4444', // Light mode destructive color
					dark: '#F87171' // Dark mode destructive color
				},
				border: {
					DEFAULT: '#D1D5DB', // Light mode border
					dark: '#2C2F3B' // Dark mode border
				},
				input: {
					DEFAULT: '#F3F4F6', // Light mode input background
					dark: '#2C2F3B' // Dark mode input background
				},
				ring: {
					DEFAULT: '#1b3279', // Light mode ring
					dark: '#869de4' // Dark mode ring
				},
				popover: {
					DEFAULT: '#FFFFFF', // Light mode popover background
					dark: '#1C1F2B' // Dark mode popover background
				}
			}
		}
	},
	plugins: [require('tailwindcss-animate')] // Animations plugin for smooth transitions
};
