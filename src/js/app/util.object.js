myapp.define({
	name: "util-object",
	main: function() {
		"use strict";

		return function UtilObject(options) {
			"use strict";

			var _api = this;	



			/************************* Validate *************************/			
			// If: The util.obj was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "UtilObject") {
				throw new SyntaxError(`UtilObject is not a function, use it as a constructor. Usage: var util.object = new UtilObject({})`);
			}



			/************************* Public API *************************/
			_api.isNull = function(obj) {
				return (typeof obj === "object" && obj === null);
			};


			_api.isNotNull = function(obj) {
				return (typeof obj === "object" && obj !== null);
			};


			_api.fromArray = function(array, namespace) {
				var obj;

				if (!Array.isArray(array)) {
					throw new SyntaxError(`Unable to convert the array to an object. Not a valid array (typeof: ${typeof array}).`);
				}

				if (typeof namespace !== "string") {
					throw new SyntaxError(`Unable to convert the array to an object. The namespace must be a valid string (typeof: ${typeof namespace}).`);
				}

				obj = {};

				array
					.forEach(entry => {
						var key = entry[namespace];
						delete entry[namespace];
						obj[key] = entry;
					});

				return obj;
			};



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
