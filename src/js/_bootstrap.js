/**
	The bootloader for the single-page-application.  No other 
	objects are within the global 'window' namespace.
*/
myapp.onReady(function() {
	"use strict";

	var _baseElement,
		_router,
		_component,
		_dom,
		_logger,
		_messenger,
		_router,
		_util,
		_flags,
		_enums,
		_user,
		_svc,
		_helpers;


	// Base DOM element
	_baseElement = document.querySelector("#application-container");


	// Handle router
	_router.onRouteChanged = function(route) {
		if (route.status === 200) {
			_router.success(route);
		}
		else if (route.status === 404) {
			_router.notFound(route);
		}
	};


	_router.success = function(route) {		
		_component
			.module(route.key, _baseElement, route.data)
			.then(module => {
				_messenger.global.post("onRouteChanged", route);
				//module
			});
	};


	_router.notFound = function(route) {
		_component
			.module("not-found", _baseElement)
			.then(module => module);
	};



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

			_router = new myapp.Router({
				routes: myapp.getAppData("default-routes"),
				baseElement: _baseElement,
				interceptor: {
					enabled: true,
					disabledClass: "setting-ignore-interceptor"
				},
				onRouteChanged: _router.onRouteChanged
			});

			// 
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

			//
			_router.gotoByLink(location.href;

			// // Load initial modules
			// _component.module(domElement1);
			// _component.module(domElement2);

			// _router.gotoByKey(key, data);
		});



	/*********************************** Load Service Worker ***********************************/
};
