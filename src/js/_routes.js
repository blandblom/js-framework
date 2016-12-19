/**
	
*/
myapp.appData("default-routes", {
	"default": {
		title: "",
		path: {
			regExp: /^\/r?\/?$/i
		}
	},
	"my-module-name": {
		title: "My Module Title: {{ project-name }} - {{ projectId }}",
		pathname: "/r/projects/{{ projectId }}/something-between/{{ project-name }}"
		// search: [
		// 	"queryOne",
		// 	"queryTwo"
		// ]
	},
	// "my-module-name": {
	// 	title: "My Module Title: ${data.propertyOne} - ${data.propertyTwo}",
	// 	path: {
	// 		regExp: /^\/r\/projects\/([A-Za-z0-9_\-]*)\/?([A-Za-z0-9_\-]*)?\/?.*$/i,
	// 		definition: {
	// 			propertyOne: "pathname[0]",
	// 			propertyTwo: "pathname[1]",
	// 			propertyThree: "search.queryOne"
	// 		}
	// 	}
	// }
});
