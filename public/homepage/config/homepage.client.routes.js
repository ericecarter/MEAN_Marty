// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'homepage' module routes
angular.module('homepage').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'homepage/views/homepage.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]); 
