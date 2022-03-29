module.exports = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": [ "warn", "tab" ],
		"linebreak-style": [ "warn", "unix" ],
		"quotes": [ "warn", "double" ],
		"semi": [ "warn", "always" ]
	}
};
