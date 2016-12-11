/**
	
*/
function createDOM() {
	"use strict";


	/************************* Static Helpers *************************/
	var _static = {};



	/************************* Instance Object *************************/
	return function DOM(options) {
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
};
