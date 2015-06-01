/**
 * Created by ecarter on 5/26/2015.
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' module unit test suite
describe('Testing the Lobby Controller', function() {
    // Define global variables
    var  $scope, $q, $rootScope, LobbyController, mockCookiesService, mockSocketService;

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

    beforeEach(inject(function($controller, _$cookies_, _Socket_){
        // Add a new Jasmine matcher
        jasmine.addMatchers({
            toEqualData: function() {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });

        $scope = $rootScope.$new();

        mockCookiesService = _$cookies_;
        mockSocketService = _Socket_;

        // Create spies for the mocked services
        spyOn(mockCookiesService, 'put');
        spyOn(mockSocketService, 'emit');


        $controller('LobbyController', {
            '$scope': $scope,
            '$cookies': mockCookiesService,
            'Socket': mockSocketService
        });
    }));

    describe('when initially loaded', function(){
        it('should initialize the scope correctly', function(){
            inject(function($httpBackend, $timeout) {

                // Define a request assertion
                $httpBackend.expectGET('api/rooms').respond(mockRoomList);

                // Call the controller's 'loadAvailableRooms' method
                $scope.loadAvailableRooms();

                // Flush the queue of pending tasks
                $timeout.flush();

                // Flush the mock HTTP results
                $httpBackend.flush();

                // Test the results
                expect($scope.roomList).toEqualData(mockRoomList);
            })
        })
    });

    describe('when the makeRoom function is called', function(){
        it('calls the appropriate services', function(){
            inject(function($httpBackend, Rooms){
                var mockRoom = new Rooms ({
                    roomName: 'Room1',
                    population: 1});

                // Define a request assertion
                $httpBackend.expectPOST('api/rooms').respond(mockRoom);

                // Call the controller's 'makeRoom' method
                $scope.makeRoom();

                // Flush the mock HTTP results
                $httpBackend.flush();


                // Test the results
                expect(mockCookiesService.put).toHaveBeenCalledWith('currentRoomId', undefined);
                expect(mockSocketService.emit).toHaveBeenCalled();
            })
        })
    });

    describe('when the joinRoom function is called', function(){
        it('calls the appropriate services', function(){
            inject(function($httpBackend, Rooms){
                var mockRoom = new Rooms ({
                    roomName: 'Room1',
                    population: 1});

                // Define a request assertion
                $httpBackend.expectPUT('api/rooms').respond(mockRoom);

                // Call the controller's 'makeRoom' method
                $scope.joinRoom(mockRoom);

                // Flush the mock HTTP results
                $httpBackend.flush();


                // Test the results
                expect(mockCookiesService.put).toHaveBeenCalledWith('currentRoomId', undefined);
                expect(mockSocketService.emit).toHaveBeenCalledWith('joinRoom', mockRoom.roomName );
            })
        })
    });
});