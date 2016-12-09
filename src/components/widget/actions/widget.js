
myapp.defineAction({
	name: "action-name",
	requireApp: true,
	require: [
		"base"
		"my-component",
		"/components/my-component.js",
		"/components/combined.js#my-component"
	],
	main: function(
		config, util, flags, enums, dom,
		messenger, logger, router,
		svc, helpers, component,
		MyComponent
	) {
		"use strict";

		var _static = {};		


		return function (_container, _component, _model, _module, _messenger) {
			"use strict";

			_model.propertyOne = 123345;


			component
				.create("model-name", _module, {})
				.then(component => component);

			component
				.createList("model-name", _module, [])
				.then(componentList => componentList);
		};
	}
});
