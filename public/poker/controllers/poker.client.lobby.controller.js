/**
 * Created by ecarter on 5/14/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'lobby' controller
angular.module('poker').controller('LobbyController', ['$scope', '$route', '$timeout', 'Socket', '$location', '$window', '$cookies', 'Rooms',
    function($scope, $route, $timeout, Socket, $location, $window, $cookies, Rooms) {
        // Create a room list array and query the database for current rooms
        $scope.loadAvailableRooms = function() {
            $timeout(function () {
                $scope.roomList = Rooms.query();
            }, 250);
        };

        // Function to create a new room
        $scope.makeRoom = function(){
            // Create a new room
            var newRoom = new Rooms({
                    roomName: "Room" + Math.floor((Math.random() * 1000) + 1),
                    population: 1
                });

            // Emit a 'joinRoom' message event
            Socket.emit('joinRoom', newRoom.roomName);

            // Update the database with the new room
            newRoom.$save(function(){
                // On success take the user to the poker page
                $location.path('/poker/room');
                $cookies.put('currentRoomId', newRoom._id);
            },
                // On failure reload the page
                $route.reload()
            );

        };

        // Function to join an existing room
        $scope.joinRoom = function (room){
            // Emit a 'joinRoom' message event
            Socket.emit('joinRoom', room.roomName);

            // Add 1 to the room's population
            room.population++;

            // Update the database with the changes to the room
            room.$update({roomId: room._id}, function(){
                // On success update the browser cookies and go to poker
                $cookies.put('currentRoomId', room._id);
                $location.path('/poker/room');
            },
                // On failure reload the page
                $route.reload()
            );

        };

        Socket.on('updateRooms', function(){
            $timeout(function () {
                $scope.roomList = Rooms.query();
            }, 250);
        });
    }
]);
