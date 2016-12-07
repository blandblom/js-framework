myapp.define({
	name: "util-uri",
	main: function() {
		"use strict";


		/************************* Static Helpers *************************/
		var _static = {};


		_static.convertParts = function(path, idx) {
			if (typeof path === "undefined" || (typeof path === "string" && path.trim() === "")) {
				return undefined;
			}
			else if (path === separator) {
				return "";
			}
			else if (path === `${separator}${separator}`) {
				return separator;
			}
			else if (path.endsWith("://")) {
				return path.substr(0, path.length - 1);
			}
			else if (path.startsWith("//")) {
				return "/" + path.replace(REGEX_FOWARD_SLASH, "$2");
			}
			else if (path.startsWith("\\")) {
				return "\\" + path.replace(REXEX_BACK_SLASH, "$2");
			}
			else if (path.startsWith("/") && idx === 0) {
				return "/" + path.replace(REGEX_FOWARD_SLASH, "$2");
			}
			else if (separator === "/") {
				return path.replace(REGEX_FOWARD_SLASH, "$2");
			}
			else if (separator === "\\") {
				return path.replace(REXEX_BACK_SLASH, "$2");
			}
			else {
				return path;
			}
		};


		_static.removeNullOrUndefined = function() {
			return (
				typeof value !== "undefined"
				|| value === null
			);
		};



		/************************* Instance Object *************************/
		return function UtilURI(options) {
			"use strict";

			var _api = this,
				_convertParts,
				_removeNullOrUndefined;	


			const REGEX_FOWARD_SLASH = /^(\/+)?(.+?)(\/+)?$/g;
			const REXEX_BACK_SLASH = /^(\\+)?(.+?)(\\+)?$/g;



			/************************* Validate *************************/
			// If: The util.uri was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "UtilURI") {
				throw new SyntaxError(`UtilURI is not a function, use it as a constructor. Usage: var util.uri = new UtilURI({})`);
			}



			/************************* Public API *************************/
			/*
				Dynamic constructor
					1: (string, string, ...)
					2: ([string, string, ...], separator)
			*/
			_api.createPath = function() {
				var pathParts, separator;

				pathParts = Array.from(arguments);

				// If: Secondary constructor
				// Else: Default constructor
				if (Array.isArray(pathParts[0])) {
					pathParts = pathParts[0];
					separator = (typeof pathParts[1] === "string")
						? pathParts[1]
						: "/";
				}
				else {
					separator = "/";
				}

				return pathParts
					.map(_static.convertParts)
					.filter(_static.removeNullOrUndefined)
					.join(separator)
					.replace(/\/\\/igm, "\\")
			};



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
