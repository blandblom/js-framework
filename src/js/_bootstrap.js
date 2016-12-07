/**
	The bootloader for the single-page-application.  No other 
	objects are within the global 'window' namespace.
*/
var myapp = new function() {
	"use strict";

	var _api = this,
		_requireMappings,
		_dependencyManager,
		_createDependency;



	/************************* Require Mappings *************************/
	_requireMappings = {
		// Configuration
		"config": "/js/_config.js",

		// SAMPLE - Assumed to be the first on the page (should only be 1 definition in this case but that is not enforced)
		"name-of-definition": "/js/sample.js",

		// SAMPLE - Not assumed, must give the name of the definition
		"name-of-definition": "/js/sample.js#name-of-definition",

		// Application
		"enums": "/js/_app.js#enums",
		"flags": "/js/_app.js#flags",
		"helpers": "/js/_app.js#helpers",
		"svc": "/js/_app.js#svc",
		"user": "/js/_app.js#user",
		"util": "/js/_app.js#util",
		"util-array": "/js/_app.js#util-array",
		"util-object": "/js/_app.js#util-object",
		"util-string": "/js/_app.js#util-string",
		"util-uri": "/js/_app.js#util-uri",

		// Framework
		"component": "/js/_framework.js#component",
		"dom": "/js/_framework.js#dom",
		"enum": "/js/_framework.js#enum"
		"logger": "/js/_framework.js#logger",
		"messenger": "/js/_framework.js#messenger",
		"router": "/js/_framework.js#router",

		// Component: My Component
		"myComponent_ModelPartA": "/components/my-component.js#modelPartA"
	};



	/************************* Dependency Manager *************************/
	_dependencyManager = new function() {
		var dependencyList = [];

		return {
			addObject: function() {
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


	_createDependency = function(options) {
		var dependency;

		//
		dependency = {
			name: options.name,
			main: options.main(
				_config, _util, _flags, _enums, _dom,
				_messenger, _logger, _router,
				_svc, _helpers, _component,
				...arguments
			)
		};	

		return dependency;
	};


	_api.define = function(options) {
		// Verify arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The definition must be defined with the following object: { name: string, main: function, require: optional array<string> }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The definition must have a valid name (usage: { name: string, main: function, require: optional array<string> }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The definition must have a valid function (usage: { name: string, main: function, require: optional array<string> }).`);
		}

		//
		return dependencyManager
			.load(options.require)
			.then(function() {
				//
				var dependency = createDependency(options);

				//
				dependencyManager.add(dependency);

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineModel = function(options) {
		// Verify arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The model must be defined with the following object: { name: string, main: function, keys: optional array<string>, require: optional array<string> }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The model must have a valid name (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string> }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The model must have a valid function (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string> }).`);
		}

		//
		return dependencyManager
			.load(options.require)
			.then(function() {
				//
				var dependency = createDependency(options);		

				//
				component.model({
					name: options.name,
					keys: options.keys,
					main: dependency.main
				});

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineAction = function(options) {};



	_api.require = function(dependencies) {
		return dependencyManager
			.load(dependencies);
	};



	/************************* On Document Ready *************************/
	document.addEventListener("DOMContentLoaded", function(event) {
		// Load dependencies
		dependencyManager
			.load([
				"config", "util", "flags", "enums", "dom",
				"messenger", "logger", "router",
				"svc", "helpers", "component"
			])
			.then(function(
				Config, Util, Flags, Enums, DOM,
				Messenger, Logger, Router,
				Svc, Helpers, Component
			) {
				_config = new Config();
				_util = new Util();
				_flags = new Flags();
				_enums = new Enums();
				_dom = new DOM();
				_messenger = new Messenger();
				_logger = new Logger();
				_router = new Router();
				_svc = new Svc();
				_helpers = new Helpers();
				_component = new Component();
			});
	});



	/************************* Return Public API (global to browser) *************************/
	return _api;
};
