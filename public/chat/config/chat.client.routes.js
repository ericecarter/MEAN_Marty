// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/chat/room', {
			templateUrl: 'chat/views/chat.client.view.html'
		}).
		when('/chat/lobby', {
			templateUrl: 'chat/views/chat.client.lobby.html'
			});
	}
]); 
