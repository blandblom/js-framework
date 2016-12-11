/**
	
*/
var myapp = new function() {
	"use strict";

	var _app = {},
		_class = {},
		_api = {},
		_helpers = {},
		_baseDependencies = [],
		_onReadyList = [],
		_isInitialized = false,
		_bootstrap,
		_config,
		_requireMappings;


	// ::: Framework Internals Placeholder ::: //



	/*********************************** Helpers - Dependency Manager ***********************************/	
	_helpers.dependencyManager = new function() {
		var dependencyList = [];

		return {
			add: function() {
				dependencyList.push();
			},
			load: function(dependencies) {
				dependencyList
					.filter()
					.map(e => e.fn);

				if (true) {
					return Promise.resolve();
				}
				else {
					return Promise.reject();
				}
			}
		};
	};


	_helpers.createDependency = function(options, dependencies) {
		var dependency, requestedDependencies;

		//
		if (options.requireApp) {
			requestedDependencies = _baseDependencies.concat(dependencies);
		}
		else {
			requestedDependencies = dependencies;
		}

		//
		dependency = {
			name: options.name,
			main: options.main.apply(undefined, requestedDependencies)
		};	

		return dependency;
	};



	/*********************************** API - Dependency Manager ***********************************/
	_api.require = function(dependencies) {
		return _helpers
			.dependencyManager
			.load(dependencies);
	};


	_api.define = function(options) {
		// Validate arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The definition must be defined with the following object: { name: string, main: function, require: optional array<string>, requireApp: optional boolean }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The definition must have a valid name (usage: { name: string, main: function, require: optional array<string>, requireApp: optional boolean, requireApp: optional boolean }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The definition must have a valid function (usage: { name: string, main: function, require: optional array<string>, requireApp: optional boolean }).`);
		}

		//
		return _helpers
			.dependencyManager
			.load(options.require)
			.then(function(dependencies) {
				//
				var dependency = _helpers.createDependency.apply(options, dependencies);

				//
				_helpers.dependencyManager.add(dependency);

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineModel = function(options) {
		// Validate arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The model must be defined with the following object: { name: string, main: function, keys: optional array<string>, require: optional array<string>, requireApp: optional boolean }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The model must have a valid name (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string>, requireApp: optional boolean }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The model must have a valid function (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string>, requireApp: optional boolean }).`);
		}

		//
		return _helpers
			.dependencyManager
			.load(options.require)
			.then(function(dependencies) {
				//
				var dependency = _helpers.createDependency(options, dependencies);		

				//
				_component.model({
					name: options.name,
					keys: options.keys,
					main: dependency.main
				});

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineAction = function(options) {
		// Validate arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The action must be defined with the following object: { name: string, main: function, require: optional array<string>, requireApp: optional boolean }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The action must have a valid name (usage: { name: string, main: function, require: optional array<string>, requireApp: optional boolean, requireApp: optional boolean }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The action must have a valid function (usage: { name: string, main: function, require: optional array<string>, requireApp: optional boolean }).`);
		}

		//
		return _helpers
			.dependencyManager
			.load(options.require)
			.then(function(dependencies) {
				//
				var dependency = _helpers.createDependency(options, dependencies);		

				//
				_component.action({
					name: options.name,
					main: dependency.main
				});

				//
				return Promise.resolve(dependency);
			});
	};



	/*********************************** API - Framework Objects ***********************************/	
	_api.Component = createComponent();
	_api.DOM = createDOM();
	_api.Enum = createEnum();
	_api.Logger = createLogger();
	_api.Messenger = createMessenger();
	_api.Router = createRouter();
	
	// // //
	// // _class.Component = createComponent();
	// // _class.DOM = createDOM();
	// // _class.Enum = createEnum();
	// // _class.Logger = createLogger();
	// // _class.Messenger = createMessenger();
	// // _class.Router = createRouter();

	// //
	// _app.component = _class.Component();
	// _app.dom = _class.DOM();
	// _app.logger = _class.Logger();
	// _app.messenger = _class.Messenger();
	// _app.router = _class.Router();



	/*********************************** API - Bootstrap & Configuration ***********************************/
	_api.config = function(config)	 {
		_config = Object.freeze(config);
	};


	_api.requireMappings = function(requireMappings) {
		_requireMappings = Object.freeze(requireMappings);
	};


	_api.setBaseDependencies = function(baseDependencies) {
		if (Array.isArray(baseDependencies)) {
			_baseDependencies = baseDependencies;
		}
	};


	_api.onReady = function(fn) {
		// Validate arguments
		if (typeof fn !== "function") {
			throw new SyntaxError(`The onReady() methods is expecting a function.`);
		}

		//
		if (_isInitialized) {
			fn();
		}
		else {
			_onReadyList.push(fn);
		}
	};


	// _api.bootstrap = function(bootstrapFn) {
	// 	// Validate arguments
	// 	if (typeof bootstrapFn !== "function") {
	// 		throw new SyntaxError(`Expecting a bootstrap function (usage: bootstrap(function)).`);
	// 	}

	// 	if (typeof _bootstrap === "function") {
	// 		throw new Error(`The bootstrap method is already defined.`);
	// 	}

	// 	if (_isInitialized) {
	// 		throw new Error(`The application has already been initialized.`);
	// 	}

	// 	//
	// 	_bootstrap = bootstrapFn;

	// 	//
	// 	if (
	// 		!_isInitialized
	// 		&& (document.readyState === "interactive" || document.readyState === "complete")
	// 	) {
	// 		_bootstrap();
	// 		_isInitialized = true;
	// 	}
	// 	else if (!_isInitialized) {
	// 		document.addEventListener("DOMContentLoaded", function(event) {
	// 			_bootstrap();
	// 			_isInitialized = true;
	// 		};
	// 	}
	// };



	/*********************************** Return API ***********************************/
	document.addEventListener("DOMContentLoaded", function(event) {
		_isInitialized = true;

		_onReadyList.forEach(fn => {
			if (typeof fn === "function") {
				fn();
			}
		});
	};



	/*********************************** Return API ***********************************/
	return _api;
};
