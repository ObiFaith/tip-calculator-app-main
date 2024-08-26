/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
	content: ['./*.js', './index.html'],
	theme: {
		colors: {
			white: colors.white,
			cyan: 'hsl(172, 67%, 45%)',
			'grayish-cyan': 'hsl(184, 14%, 56%)',
			'very-dark-cyan': 'hsl(183, 100%, 15%)',
			'dark-grayish-cyan': 'hsl(186, 14%, 43%)',
			'light-grayish-cyan': 'hsl(185, 41%, 84%)',
			'very-light-grayish-cyan': 'hsl(189, 41%, 97%)',
		},
		extend: {},
	},
	plugins: [],
};
