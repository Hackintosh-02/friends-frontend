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
					DEFAULT: '#FFFFFF', // Light mode background
					dark: '#202124' // Dark mode background
				},
				foreground: {
					DEFAULT: '#111827', // Light mode text
					dark: '#E5E7EB' // Dark mode text
				},
				card: {
					DEFAULT: '#F8F9FA', // Light mode card background
					dark: '#272A30' // Dark mode card background
				},
				muted: {
					DEFAULT: '#6B7280', // Light mode muted text
					dark: '#A1A1AA' // Dark mode muted text
				},
				primary: {
					DEFAULT: '#6366F1', // Light mode primary color
					dark: '#8B5CF6' // Dark mode primary color
				},
				secondary: {
					DEFAULT: '#FBBF24', // Light mode secondary color
					dark: '#FACC15' // Dark mode secondary color
				},
				accent: {
					DEFAULT: '#22D3EE', // Light mode accent color
					dark: '#06B6D4' // Dark mode accent color
				},
				destructive: {
					DEFAULT: '#EF4444', // Light mode destructive color
					dark: '#F87171' // Dark mode destructive color
				},
				border: {
					DEFAULT: '#D1D5DB', // Light mode border
					dark: '#374151' // Dark mode border
				},
				input: {
					DEFAULT: '#F3F4F6', // Light mode input background
					dark: '#374151' // Dark mode input background
				},
				ring: {
					DEFAULT: '#6366F1', // Light mode ring
					dark: '#8B5CF6' // Dark mode ring
				},
				popover: {
					DEFAULT: '#FFFFFF', // Light mode popover background
					dark: '#3B3F45' // Dark mode popover background
				}
			}
		}
	},
	plugins: [require('tailwindcss-animate')] // Animations plugin for smooth transitions
};
