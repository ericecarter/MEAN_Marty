/**
 * Created by ecarter on 5/26/2015.
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' module unit test suite
describe('Testing Lobby Controller', function() {
    // Define global variables
    var _scope, LobbyController;

    // Define a pre-tests function
    beforeEach(function() {
        // Load the 'mean' module
        module('mean');

        // Add a new Jasmine matcher
        jasmine.addMatchers({
            toEqualData: function(util, customEqualityTesters) {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });

        // Use the 'inject' method to inject services
        inject(function($rootScope, $controller) {
            // Create a mock scope object
            _scope = $rootScope.$new();

            // Create a new mock controller
            LobbyController = $controller('LobbyController', {
                $scope: _scope
            });
        });
    });

    // Test the scope retrieving a list of rooms
    it('Should have a find method that uses $resource to retrieve a list of rooms', inject(function(Rooms) {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {
            // Create a sample room
            var sampleRoom = new Rooms({
                roomName: 'roomName',
                population: 1
            });

            // Create a sample rooms list
            var sampleRooms = [sampleRoom];

            // Define a request assertion
            $httpBackend.expectGET('api/rooms').respond(sampleRooms);

            // Flush the mock HTTP results
            $httpBackend.flush();

            // Test the results
            expect(_scope.roomList).toEqualData(sampleRooms);
        });
    }));

});