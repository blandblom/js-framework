/**
	The bootloader for the single-page-application.  No other 
	objects are within the global 'window' namespace.
*/
// myapp.bootstrap(function() {
myapp.onReady(function() {
	"use strict";



	/*********************************** Load Dependencies ***********************************/
	myapp
		.require([
			"util", "flags", "enums", "user", "svc", "helpers"
		])
		.then(function(
			Util, Flags, Enums, User, Svc, Helpers
		) {
			// 
			_component = new myapp.Component();
			_dom = new myapp.DOM();
			_logger = new myapp.Logger();
			_messenger = new myapp.Messenger();
			_router = new myapp.Router();

			_util = new Util();
			_flags = new Flags();
			_enums = new Enums();
			_user = new User();
			_svc = new Svc();
			_helpers = new Helpers();

			//
			myapp.setBaseDependencies([
				_confg, _util, _flags, _enums, _dom,
				_messenger, _logger, _router,
				_user, _svc, _helpers, _component
			]);

			// Load initial modules
			component.module(domElement1);
			component.module(domElement2);
		});



	/*********************************** Load Service Worker ***********************************/
};
