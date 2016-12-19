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
			_getData,
			_getTitle,
			_onRouteChanged;

		const REGEXP_TITLE_TOKEN = /{{\s*[A-Za-z0-9\-\_]+\s*}}/ig;



		/*********************************** Validate ***********************************/
		// If: Router was called as a function and not as a constructor.
		if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Router") {
			throw new SyntaxError(`Router is not a function, use it as a constructor. Usage: var router = new Router(options)`);
		}



		/*********************************** Private Helpers ***********************************/
		_linkInterceptor = function(event) {
			if (
				_isLinkInterceptorActive
				&& (event.target instanceof HTMLAnchorElement)
				&& Array.from(event.target.classList).indexOf("setting-enforce-default") !== -1
			) {
				event.preventDefault();
				_api.gotoByLink(event.href);
			}
		};


		_gotoByEvent = function(event) {
			if (event.isTrusted) {
				_api.goToByLink(location.href);
			}
		};


		_goto = function(route, key, pathname, search) {
			var path, title, data, status;

			// Get 
			path = (typeof search === "string")
				? pathname + search,
				: pathname;

			// 
			if (typeof route === "object" && route !== null) {
				status = 200;
				data = _getData(route, pathname, search);
				title = _getTitle(route, data);
			}
			else {
				status = 404;
				title = "Page Not Found";
			}

			// Update location and title
			document.title = title;

			history.pushState(
				undefined,
				key,
				path
			);

			// Trigger route changed event
			if (typeof _onRouteChanged === "function") {				
				_onRouteChanged({
					status: status,
					path: path,
					pathname: pathname,
					search: search,
					key: key,
					data: data
				});
			}
		};


		_getData = function(route, pathname, search) {
			var data = {},
				result;

			//
			if (typeof route.pathname === "string") {
				keyMap = route
					.pathname
					.split("/")
					.map(part => {
						REGEXP_TITLE_TOKEN.lastIndex = 0;
						return (REGEXP_TITLE_TOKEN.test(part))
							? _trimToken(part)
							: undefined;
					});

				pathname
					.split("/")
					.forEach((value, idx) => {
						var key = keyMap[idx];

						if (typeof key === "string" && key.trim() !== "") {
							data[key] = value;
						}
					});

				// route
				// 	.pathname
				// 	.split("/")
				// 	.map(part => {
				// 		var
				// 		// Reset regexp
				// 		REGEXP_TITLE_TOKEN.lastIndex = 0;

				// 		if (REGEXP_TITLE_TOKEN.test(part)) {

				// 		}

				// 	});
				// 	.filter(s => s.startsWith("{{") && s.endsWith("}}"))
			}

			// if (route.path.reqExp instanceof RegExp) {
			// 	result = route.path.exec(path);

			// 	if (Array.isArray(result)) {
			// 		pathnameData = result.splice(1)
			// 	}
			// }

			// //
			// Object
			// 	.keys(route.path.definition)
			// 	.forEach(key => {
			// 		data[key] = eval(route.path.definition[key]);
			// 	});

			//
			if (typeof search === "string") {
				search
					.replace("?", "")
					.split("&")
					.forEach(str => {
						var parts, key, value;

						parts = str.split("=");
						key = parts[0];
						value = (typeof parts[1] === "string")
							? parts[1]
							: true;

						data[key] = value;
					});
			}

			return data;
		};


		_getTitle = function(route, data) {
			var title = "",
				tokens;

			if (typeof route.title === "string") {
				// Reset regexp
				REGEXP_TITLE_TOKEN.lastIndex = 0;

				//
				title = route.title;
				tokens = title.match(REGEXP_TITLE_TOKEN);

				if (Array.isArray(tokens)) {
					tokens
						.forEach(token => {
							var key, value;
							key = _trimToken(token);
							value = data[key];
							title.replace(token, value);
						});
				}
			}
			
			return title;
		};


		// _getTitle = function(route, data) {
		// 	return (typeof route.title === "string")
		// 		? eval("`" + route.title + "`")
		// 		: "";
		// };


		_stringifyPathname = function(pathname, data) {

		};


		_parsePathname = function(pathname, data) {

		};


		_trimToken = function(token) {
			return token
				.replace("{{", "")
				.replace("}}", "")
				.trim();
		}



		/*********************************** Public API ***********************************/
		_api.gotoByKey = function(key, data) {
			var route, pathname, search;

			//
			route = _route[key];

			if (typeof route === "object") {
				pathname = _stringifyPathname(route.pathname, data);
				search = _stringifySearch(route.search, data);
			}

			//
			_goto(route, key, pathname, search);
		};


		// _api.gotoByPath = function(pathname, search) {
		// 	var route, key;

		// 	// Get route
		// 	if (typeof path === "string" && path.trim() !== "") {
		// 		route = ;
		// 	}
		// 	else {
		// 		route = _routes["default"];
		// 	}

		// 	// 
		// 	_goto(route, key, pathname, search);
		// };


		_api.gotoByLink = function(link) {
			var linkParts, pathname, search, hash;

			//
			if (typeof link === "string") {
				linkParts = link
					.replace(location.origin, "")
					.split(/\?|\#/);

				pathname = linkParts[0];
				search = linkParts[1];
				hash = linkParts[2];
			}

			// Get route
			if (typeof pathname === "string" && path.trim() !== "") {
				route = Object
					.keys(_routes)
					.find(route => {
						route.pathname
					});
			}
			else {
				route = _routes["default"];
			}

			// 
			_goto(route, key, pathname, search);
		};



		/*********************************** Initialize ***********************************/
		// Validate
		if (typeof options.onRouteChanged !== "undefined" && typeof options.onRouteChanged !== "function") {
			throw new SyntaxError(`The "onRouteChanged" callback must be a function (usage: options.onRouteChanged = function).`);
		}


		// Get options
		_routes = options.routes;
		_onRouteChanged = options.onRouteChanged;
		_isLinkInterceptorActive = (!!options.interceptLinks);
		_baseElement = (options.baseElement instanceof HTMLElement)
			? options.baseElement
			: document.body;


		// Listen to changes to the window.history's state
		window.addEventListener("popstate", _gotoByEvent);


		// Intercept the link click events
		_baseElement.addEventListener("click", _linkInterceptor);



		/*********************************** Return API ***********************************/
		return Object.freeze(_api);
	};
};
