myapp.define({
	name: "enums",
	require: ["enum"],
	main: function(Enum) {
		"use strict";

		return function Enums(options) {
			"use strict";

			var _api = this;	



			/************************* Validate *************************/
			// If: The enums was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Util") {
				throw new SyntaxError(`Enums is not a function, use it as a constructor. Usage: var enums = new Enums()`);
			}



			/************************* Initialize *************************/
			_api. = new Enum({
				zero: [0, "zero"],
				one: [1, "one"],
				two: [2, "two"]
			});



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
