
myapp.defineModel({
	name: "model-name",
	requireApp: true,
	require: [
		"base"
		"my-component",
		"/components/my-component.js",
		"/components/combined.js#my-component"
	],
	keys: [
		"propertyOne",
		"propertyTwo",
		"propertyThree"
	],
	main: function(
		config, util, flags, enums, dom,
		messenger, logger, router,
		svc, helpers, component,
		MyComponent
	) {
		"use strict";

		var _static = {};		

		return function(_api, _model, _module, _messenger, _promises) {
			"use strict";

			_model.propertyOne = 123345;
		};
	}
});
