/**
	
*/
myapp.define({
	name: "component",
	require: ["component-model", "component-view"],
	main: function(_Model, _View) {
		"use strict";

		var _static = {};



		_static.Component = function Component(modelDefinitionList, actionDefinitionList, modelName, module, inputs) {
			var api = {},
				model,
				modelDefinition;


			// Verify
			if (typeof modelName !== "string" || modelName.trim() === "") {
				throw new SyntaxError(`A model name is required (usage: component.create(string, module, {})).`);
			}

			if (typeof module !== "object" || module === null) {
				throw new SyntaxError(`The component must be a child of a module (usage: component.create(string, module, {})).`);
			}


			onModelChanged = function(event) {
				event.key;
				event.value;
				event.previousValue;

				views.forEach(view => view.onModelChanged(event));
			};


			modelDefinition = options.modelDefinitions[modelName];

			model = new _Model({
				definition: modelDefinition,
				module: module,
				inputs: inputs,
				onModelChanged: onModelChanged
			});

			//messenger.model.post("onModelReady", inputs);

			messenger.model.listen("onModelChanged", );

			modelDefinition.main

			// The component's API takes precedence over what the model returns
			_api = Object.assign({}, model, _api);


			_api.destroy = function() {

			};


			_api.destroyView = function() {

			};


			/************************* Return API *************************/
			return Object.freeze(_api);
		};



		return function() {
			"use strict";

			var _api = this,
				_modelDefinitions = [],
				_actionDefinitions = [];



			_api.module = function(options) {

				"use strict";

				var container, util, modelName, modelTemplate, modelInputs;


				// Validate
				if (typeof createOptions === "undefined") {
					throw new SyntaxError(`The module options are not defined (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
				}
				else if (typeof createOptions !== "object" || Object.keys(createOptions).length === 0) {
					throw new SyntaxError(`The module options must be an object (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
				}
				else if (!(createOptions.container instanceof HTMLElement)
					|| typeof createOptions.model !== "string"
					|| typeof createOptions.template !== "string"
					|| createOptions.model.trim() === ""
					|| createOptions.template.trim() === "") {
					throw new SyntaxError(`The module options must have a HTMLElement container, model name, and template name (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
				}

				container = createOptions.container;
				util = createOptions.util;

				modelName = createOptions.model;
				modelTemplate = createOptions.template;
				modelInputs = createOptions.inputs.

				model = new _models[modelName](
					root.model,
					root.api,
					root.protected,
					root.messenger,
					root.module: {
						createChildComponent,
						util
					},
					root.inputs
				);


				return Promise.resolve(() => new Component({}));
			};


			_api.model = function(options) {
				"use strict";

				// Verify arguments
				if (typeof options !== "object" || options === null) {
					throw new SyntaxError(`The model must be defined with the following object: component.model({ name: string, main: function, keys: [optional array] }).`);
				}

				if (typeof options.name !== "string" || options.name.trim() === "") {
					throw new SyntaxError(`The model name must be a valid string (usage: component.model({ name: string, main: function, keys: [optional array] })).`);
				}

				if (typeof options.main !== "function") {
					throw new SyntaxError(`The model must have a valid function (usage: component.model({ name: string, main: function, keys: [optional array] })).`);
				}

				// No check to see if model name currently exists.  If two
				// models have the same name, then the last one in will be
				// the current.  This is how variables work, so leaving that
				// same power to the developer to get right.
				_modelDefinitions[options.name] = {
					name: options.name,
					keys: options.keys,
					main: options.main
				};
			};


			_api.action = function(options) {
				"use strict";

				// Verify arguments
				if (typeof options.name !== "string" || options.name.trim() === "") {
					throw new SyntaxError(`The action name must be a valid string (usage: component.action({ name: string, main: function }).`);
				}

				if (typeof options.main !== "function") {
					throw new SyntaxError(`The action object must be a valid function (usage: component.action({ name: string, main: function }).`);
				}

				// No check to see if action name currently exists.  If two
				// actions have the same name, then the last one in will be
				// the current.  This is how variables work, so leaving that
				// same power to the developer to get right.
				_actionDefinitions[options.name] = {
					name: options.name,
					main: options.main
				};
			};


			_api.create = function(modelName, module, inputs) {
				return new _static.Component(_modelDefinitions, _actionDefinitions, modelName, module, inputs);
			};


			_api.createList = function(modelName, module, inputsArray) {
				var componentList, promises;

				// The components get built async, so the order
				// must be manually maintained.
				componentList = new Array(dataArray.length);

				inputsArray.forEach((inputs, idx) => {
					promises.push(
						_api
							.create(modelName, module, inputs)
							.then(component => componentList.splice(idx, 0, component))
					);
				});

				return Promise
					.all(promises)
					.then(() => componentList);
			};



			/************************* Return API *************************/
			return _api;
		};
	}
});