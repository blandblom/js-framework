/**
	
*/
myapp.appData("default-routes", {
// 	"projects": {
// 		module: "my-module-name",
// 		path: \^/r/projects/([A-Za-z0-9_\-]*)$\
// 	},
	"my-module-name": {
		title: "My Module Title: {0} - {3}",
		path: \^/r/projects/([A-Za-z0-9_\-]*)$\
	},
	"default": \^\/r?\/?$\i,
	"my-module-name": \^\/r\/projects\/([A-Za-z0-9_\-]*)$\i
});
