const config = {
	preset	: '@vue/cli-plugin-unit-jest/presets/no-babel',
	testMatch: [
		"<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)|<rootDir>/**/__tests__/*.(js|jsx|ts|tsx)"
	],
	moduleNameMapper : {
		"^@/(.*)$": "<rootDir>/assets/js/$1"
	},
	resolver: null
};

module.exports = config;
