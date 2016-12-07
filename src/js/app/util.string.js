myapp.define({
	name: "util-string",
	main: function() {
		"use strict";

		return function UtilString(options) {
			"use strict";

			var _api = this;	



			/************************* Validate *************************/			
			// If: The util.string was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "UtilString") {
				throw new SyntaxError(`UtilString is not a function, use it as a constructor. Usage: var util.string = new UtilString({})`);
			}



			/************************* Public API *************************/
			_api.isEmpty = function (str) {
				return (typeof str === "string" && str.trim() === "");
			};


			_api.isNotEmpty = function (str) {
				return (typeof str === "string" && str.trim() !== "");
			};


			_api.capitalize = function(str) {
				if (typeof str !== "string") {
					throw new SyntaxError(`Unable to capitalize a string that is not a string (typeof: ${typeof str}).`);
				}

				return str
					.toLowerCase()
					.replace( /\b./g, letter => letter.toUpperCase());
			};



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
