/**
 * Created by ecarter on 5/20/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'rooms' service
angular.module('chat').factory('Rooms', ['$resource', function($resource) {
    // Use the '$resource' service to return a room '$resource' object
    return $resource('api/rooms/:roomId', {
        roomId: '@_roomId'
    }, {
        'update': {
            method: 'PUT'
        },
        'delete':{
            method: 'DELETE'
        }
    });
}]);