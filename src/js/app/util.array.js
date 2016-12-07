myapp.define({
	name: "util-array",
	main: function() {
		"use strict";

		return function UtilArray(options) {
			"use strict";

			var _api = this;	



			/************************* Validate *************************/
			// If: The util.array was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "UtilArray") {
				throw new SyntaxError(`UtilArray is not a function, use it as a constructor. Usage: var util.array = new UtilArray({})`);
			}



			/************************* Public API *************************/
			_api.isEmpty = function(array) {
				return (Array.isArray(array) && array.length === 0);
			};


			_api.isNotEmpty = function(array) {
				return (Array.isArray(array) && array.length > 0);
			};


			/********** Array.prototype.reduce() **********/
			_api.sum = function(previousValue, currentValue, currentIndex, array) {
				if (typeof previousValue !== "number" || typeof currentValue !== "number") {
					throw new SyntaxError(`Error summing the array. The values of the array must be numbers (Index #${currentIndex - 1}: ${previousValue}, Index #${currentIndex}: ${currentValue}).`);
				}

				return (previousValue + currentValue);
			};


			/********** Object-to-Array **********/
			_api.valuesFromObject = function(obj) {
				if (typeof obj !== "object") {
					throw new SyntaxError(`Unable to create an array for the object (typeof: ${typeof obj}).`);
				}

				return Object
						.keys(obj)
						.map(key => obj[key]);
			};


			_api.keyValuePairsFromObject = function(obj) {
				if (typeof obj !== "object") {
					throw new SyntaxError(`Unable to create a key/value pair array for the object (typeof: ${typeof obj}).`);
				}

				return Object
						.keys(obj)
						.map(key => {
							return {
								key: key,
								value: obj[key]
							};
						});
			};



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
