// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', 'Socket', '$cookieStore', 'Rooms',
    function($scope, Socket, $cookieStore, Rooms) {
    	// Create a messages array
        $scope.messages = [];

        // Set up a response promise to get the current room from the database
        var response = Rooms.get({
            roomId: $cookieStore.get('currentRoomId')
        });

        // When the promise is resolved assign the current room to $scope
        response.$promise.then(function(data){
            $scope.currentRoom = data;
        });

        // Add an event listener to the 'chatMessage' event
        Socket.on('chatMessage', function(message) {
            $scope.messages.push(message);
        });
        
        // Create a controller method for sending messages
        $scope.sendMessage = function() {
        	// Create a new message object
            var message = {
                text: this.messageText,
                currentRoom: $scope.currentRoom.roomName
            };
            
            // Emit a 'chatMessage' message event
            Socket.emit('chatMessage', message);
            
            // Clear the message text
            this.messageText = '';
        }

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function() {
            Socket.removeListener('chatMessage');

            // And update the current room
            $scope.currentRoom.population--;
            if($scope.currentRoom.population > 0) $scope.currentRoom.$update({roomId: $scope.currentRoom._id});
            else $scope.currentRoom.$remove({roomId: $scope.currentRoom._id});
        })

    }
]); 
