myapp.define({
	name: "util",
	require: ["util-array", "util-object", "util-string", "util-uri"],
	main: function(UtilArray, UtilObject, UtilString, UtilURI) {
		"use strict";

		return function Util(options) {
			"use strict";

			var _api = this;	



			/************************* Validate *************************/
			// If: The util was called as a function and not as a constructor.
			// Then: Throw an exception and prevent the API from being returned.
			if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Util") {
				throw new SyntaxError(`Util is not a function, use it as a constructor. Usage: var util = new Util({})`);
			}



			/************************* Initialize *************************/
			_api.array = new UtilArray();
			_api.obj = new UtilObject();
			_api.str = new UtilString();
			_api.uri = new UtilURI();



			/************************* Return API *************************/
			return Object.freeze(_api);
		};
	}
});
