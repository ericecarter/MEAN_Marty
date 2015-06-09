// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'poker' module routes
angular.module('poker').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/poker/room', {
			templateUrl: 'poker/views/poker.client.view.html'
		}).
		when('/poker/lobby', {
			templateUrl: 'poker/views/poker.client.lobby.html'
			});
	}
]); 
