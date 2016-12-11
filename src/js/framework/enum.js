/**
	
*/
function createEnum() {
	"use strict";


	/************************* Static Helpers *************************/
	var _static = {};


	_static.reservedKeys = [
		"constructor",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"toLocaleString",
		"toString",
		"valueOf",
		"compare",
		"getByValue"
	];


	_static.EnumInstance = function EnumInstance(enumInstanceKey, enumInstanceValues) {
		"use strict";

		var isValueInList = function(value) {
			var key, isValueInList = false;

			for (key in enumInstanceValues) {
				if (value === enumInstanceValues[key]) {
					isValueInList = true;
					break;
				}
			}

			return isValueInList;
		};

		return Object.freeze({
			get isEnumInstance() { return true; },
			toString: function() {
				return enumInstanceKey;
			},
			equals: function(compareValue) {
				return (
					(compareValue === this)
					|| isValueInList(compareValue)
				);
			}
		});
	};


	_static.isKeyReserved = function(key) {
		var i, isReserved = false;

		for (i = 0; i < _static.reservedKeys.length; i++) {
			if (_static.reservedKeys[i] === key) {
				isReserved = true;
				break;
			}
		}

		return isReserved;
	};


	_static.isEnumInstance = function(value) {
		return (
			typeof value === "object"
			&& value.isEnumInstance
		);
	};



	/************************* Instance Object *************************/
	return function Enum(_enumInstances) {
		"use strict";

		var _api = this,
			_init;



		/************************* Validate *************************/
		// If: The enum object was called as a function and not as a constructor.
		// Then: Throw an exception and prevent the API from being returned.
		if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Enum") {
			throw new SyntaxError(`Enum is not a function, use it as a constructor. Usage: var myEnum = new Enum({})`);
		}


		// If: The enum constant list is not defined.
		// Then: Throw an exception and prevent the API from being returned.
		if (typeof _enumInstances === "undefined") {
			throw new SyntaxError(`The enum constant list is not defined.  Pass an object to the constructor.`);
		}


		// If: The enum constant list is not an object.
		// Then: Throw an exception and prevent the API from being returned.
		if (typeof _enumInstances !== "object") {
			throw new SyntaxError(`The enum constant list must be an object.`);
		}



		/************************* Helper Methods *************************/
		_init = function() {
			var key;

			for (key in _enumInstances) {
				// If: The key is a reserved keyword, throw exception.
				// Else If: The one of the enum constant is not an array or does not
				//			have at least 1 value, throw exception.
				if (_static.isKeyReserved(key)) {
					throw new SyntaxError(`The key '${key}' is a reserved keyword.`);
				}
				else if (!Array.isArray(_enumInstances[key]) || _enumInstances[key].length === 0) {
					throw new SyntaxError(`The enum constant must be an array of values with a minimum of 1 value. Constant: ${key}`);
				}
				
				// Create a new enum constant object.
				_api[key] = new _EnumInstance(key, _enumInstances[key]);
			}
		};



		/************************* Public API *************************/
		_api.getByValue = function(value) {
			var enumInstance, key;

			for (key in _api) {
				if (!_static.isKeyReserved(key) && _api[key].equals(value)) {
					enumInstance = _api[key];
					break;
				}
			}

			return enumInstance;
		};


		_api.compare = function(value1, value2) {
			var enum1, enum2,
				isTheSame = false;

			// Throw an error if there are not two values.
			if (typeof value1 === "undefined" || typeof value2 === "undefined") {
				throw SyntaxError(`The compare function takes in two values. (value1: ${value1}, value2: ${value2})`);
			}

			// Convert the values to their respective enum constant
			enum1 = (_static.isEnumInstance(value1))
				? value1
				: _api.getByValue(value1);

			enum2 = (_static.isEnumInstance(value2))
				? value2
				: _api.getByValue(value2);

			// Compare the two enum constants
			if (_static.isEnumInstance(enum1) && _static.static.isEnumInstance(enum2)) {
				isTheSame = enum1.equals(enum2);
			}

			return isTheSame;
		};



		/************************* Initialize *************************/
		_init();



		/************************* Return API *************************/
		return Object.freeze(_api);
	};
};
