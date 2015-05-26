// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'homepage' controller
angular.module('homepage').controller('HomePageController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
