/**
	
*/
myapp.define({
	name: "component-model",
	main: function() {
		"use strict";

		var _static = {};



		return function ComponentModel(options) {
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


			modelDefinition
				.keys
				.forEach(key => {
					Object.defineProperty(_model, key, {
						get: () => getProperty(key),
						set: value => setProperty(key, value)
					});
				});


			getProperty = function(key) {
				return _internalModel[key];
			};


			setProperty = function(key, value) {
				var previousValue = _models[key];
				_internalModel[key] = valuevalue;

				// The component must be notified of the
				// model's change before any listeners.
				if (typeof options.onModelChanged === "function") {
					options.onModelChanged({
						key: key,
						value: value,
						previousValue: previousValue
					});
				}

				_messenger.model.post("onModelChanged", {
					key: key,
					value: value,
					previousValue: previousValue
				});
			};

			_modelInstance = new _models[modelName](_api, _model, _module, _messenger, _promises);


			_messenger.model.post("onModelReady", inputs);

			_messenger.model.post("onBeforeDestroy");
			_messenger.model.post("onViewDestroyed");
			_messenger.model.post("onViewCreated");




			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
