/**
 * Created by ecarter on 5/14/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'lobby' controller
angular.module('chat').controller('LobbyController', ['$scope', '$route', '$timeout', 'Socket', '$location', '$window', '$cookieStore', 'Rooms',
    function($scope, $route, $timeout, Socket, $location, $window, $cookieStore, Rooms) {
        // Create a room list array and query the database for current rooms
        $timeout(function(){
            $scope.roomList = Rooms.query();
        }, 250);



        $scope.makeRoom = function(){
            // Create a new room
            var newRoom = new Rooms({
                    roomName: "Room" + Math.floor((Math.random() * 1000) + 1),
                    population: 1
                });
            // Update the browser cookies
            $cookieStore.put('currentRoomName', newRoom.roomName);

            // Emit a 'joinRoom' message event
            Socket.emit('joinRoom', newRoom.roomName);


            // Update the database with the new room
            newRoom.$save(function(){
                // On success take the user to the chat page
                $location.path('/chat/room');
                $cookieStore.put('currentRoomId', newRoom._id);
            },function(errorResponse){
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });

        };
        $scope.joinRoom = function (room){
            // Emit a 'joinRoom' message event
            Socket.emit('joinRoom', room.roomName);

            // Add 1 to the room's population
            room.population++;

            // Update the database with the changes to the room
            room.$update({roomId: room._id}, function(){
                // On success update the browser cookies and go to chat
                $cookieStore.put('currentRoomName', room.roomName);
                $cookieStore.put('currentRoomId', room._id);
                $location.path('/chat/room');
            },
                // On failure reload the page
                $route.reload()
            );

        };
    }
]);
