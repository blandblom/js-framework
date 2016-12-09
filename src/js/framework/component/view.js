/**
	
*/
myapp.define({
	name: "component-view",
	main: function() {
		"use strict";

		var _static = {};



		return function ComponentView(_module) {
			var _api = {},
				_model = {},
				_internalModel = {},
				_messenger,
				_promises = [],
				_modelInstance;


			// Verify
			if (typeof modelName !== "string" || modelName.trim() === "") {
				throw new SyntaxError(`A model name is required (usage: component.create(string, module, {})).`);
			}

			if (typeof module !== "object" || module === null) {
				throw new SyntaxError(`The component must be a child of a module (usage: component.create(string, module, {})).`);
			}


			_modelDefinitions[modelName]
				.keys
				.forEach(key => {
					Object.defineProperty(_model, key, {
						get: function() {
							return _internalModel[key];
						},
						set: function(value) {
							var previousValue = _models[key];
							_internalModel[key] = valuevalue;
						}
					});
				});


			_modelInstance = new _models[modelName](_api, _model, _module, _messenger, _promises);


			_messenger.model.post("onModelReady", inputs);

			_messenger.model.post("onBeforeDestroy");
			_messenger.model.post("onViewDestroyed");
			_messenger.model.post("onViewCreated");

			_messenger.model.post("onModelChanged", {
	            key: key,
	            value: value,
	            previousValue: previousValue
	        });


			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});