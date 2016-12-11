/**
	
*/
function createRouter() {
	"use strict";


	/*********************************** Static Helpers ***********************************/
	var _static = {};



	/*********************************** Instance Object ***********************************/
	return function Router(options) {
		"use strict";

		var _api = this,
			_routes,
			_goto
			_gotoByEvent,
			_gotoCallback,
			_notFoundCallback;



		/*********************************** Validate ***********************************/
		// If: Router was called as a function and not as a constructor.
		if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Router") {
			throw new SyntaxError(`Router is not a function, use it as a constructor. Usage: var router = new Router(options)`);
		}



		/*********************************** Private Helpers ***********************************/
		_goto = function(key, path, title, data) {
			if (typeof _gotoCallback === "function") {				
				_gotoCallback({
					key: key,
					path: path,
					data: data
				});
			}

			document.title = title;

			history.pushState(
				undefined,
				key,
				path
			);
		};


		_notFound = function(key, path) {
			if (typeof _notFoundCallback === "function") {
				_notFoundCallback();
			}

			document.title = "Page Not Found";

			history.pushState(
				undefined,
				key,
				path
			);
		};


		_gotoByEvent = function(event) {
			if (event.isTrusted) {
				_api.goToByPath(location.pathname);
			}
		};


		_getDataFromPath = function(path, reqExp) {

		};



		/*********************************** Public API ***********************************/
		_api.gotoByKey = function(key) {
			var route, path, title, data;

			route = _route[key];


			if (typeof route === "object" && route !== null) {
				_goto(key, path, title, data);
			}
			else {
				_notFound(key, path);
			}
		};


		_api.gotoByPath = function(path) {
			var route, key, title, data;


			if (typeof path === "string" && path.trim() !== "") {

			}
			else {
				route = _routes["default"];
			}

			if (typeof route === "object" && route !== null) {
				_goto(key, path, title, data);
			}
			else {
				_notFound(key, path);
			}
		};



		/*********************************** Initialize ***********************************/
		// Validate
		if (typeof options.callback === "object" && options.callback !== null) {
			if (typeof options.callback.goto !== "undefined" && typeof options.callback.goto !== "function") {
				throw new SyntaxError(`The goto callback must be a function (usage: options.callback.goto = function).`);
			}

			if (typeof options.callback.notFound !== "undefined" && typeof options.callback.notFound !== "function") {
				throw new SyntaxError(`The notFound callback must be a function (usage: options.callback.notFound = function).`);
			}
		}


		//
		_routes = options.routes;
		_gotoCallback = options.callback.goto;
		_notFoundCallback = options.callback.notFound;


		// Listen to changes to the window.history's state
		window.addEventListener("popstate", _gotoByEvent);



		/*********************************** Return API ***********************************/
		return Object.freeze(_api);
	};
};
