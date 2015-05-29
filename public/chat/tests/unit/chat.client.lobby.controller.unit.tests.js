/**
 * Created by ecarter on 5/26/2015.
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' module unit test suite
describe('Testing Lobby Controller', function() {
    // Define global variables
    var  $scope, $q, $rootScope, LobbyController;

    var mockRoomList = [
        {roomName: 'Room1',
        population: 1},
        {roomName: 'Room2',
        population: 2}
    ]

    // Define a pre-tests function
    beforeEach(module('mean'));

    beforeEach(module('templates'));

    beforeEach(inject(function(_$rootScope_, _$q_){
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($controller){
        $scope = $rootScope.$new();

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

        $controller('LobbyController', {
            '$scope': $scope
        });
    }));

    describe('The Lobby Controller', function(){
        it('should initialize the scope correctly', function(){
            inject(function($httpBackend) {

                // Define a request assertion
                $httpBackend.expectGET('api/rooms').respond(mockRoomList);

                // Call the controller's 'loadAvailableRooms' method
                $scope.loadAvailableRooms();

                // Flush the mock HTTP results
                $httpBackend.flush();

                // Test the results
                expect($scope.roomList).toEqualData(mockRoomList);
            })
        })
    })
});