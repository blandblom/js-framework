myapp.define({
	name: "router",
	main: function() {
		"use strict";


		/************************* Static Helpers *************************/
		var _static = {};


		_static.validateNamespace = function() {
		};



		/************************* Instance Object *************************/
		return function Router(options) {
			"use strict";

			var _api = this;



			/************************* Validate *************************/
			// If: Router was called as a function and not as a constructor.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Router") {
				throw new SyntaxError(`Router is not a function, use it as a constructor. Usage: var router = new Router(options)`);
			}



			/************************* Public API *************************/
			_api.



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
