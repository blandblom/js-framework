/**
	
*/
myapp.requireMappings({
	// Configuration
	"config": "/js/_config.js",
	"config": {
		path: "/js/_config.js",
		isBackgroundLoad: true
	}

	// SAMPLE - Assumed to be the first on the page (should only be 1 definition in this case but that is not enforced)
	"name-of-definition": "/js/sample.js",

	// SAMPLE - Not assumed, must give the name of the definition
	"name-of-definition": "/js/sample.js#name-of-definition",

	// Application
	"app": {
		"enums": "/js/_app.js#enums",
		"flags": "/js/_app.js#flags",
		"helpers": "/js/_app.js#helpers",
		"svc": "/js/_app.js#svc",
		"user": "/js/_app.js#user",
		"util": {
			"main": "/js/_app.js#util",
			"array": "/js/_app.js#util-array",
			"object": "/js/_app.js#util-object",
			"string": "/js/_app.js#util-string",
			"uri": "/js/_app.js#util-uri"
		}
	},

	// // Framework
	// "framework": {
	// 	"component": "/js/_framework.js#component",
	// 	"dom": "/js/_framework.js#dom",
	// 	"enum": "/js/_framework.js#enum"
	// 	"logger": "/js/_framework.js#logger",
	// 	"messenger": "/js/_framework.js#messenger",
	// 	"router": "/js/_framework.js#router"
	// },

	// Services
	"svc": {
		"main": "",
		"": ""
	},

	// Component: My Component
	"myComponent_ModelPartA": "/components/my-component.js#modelPartA"
});
