// Invoke 'strict' JavaScript mode
'use strict';

// Create the poker configuration
module.exports = function(io, socket) {
    var mongoose = require('mongoose'),
        Room = mongoose.model('Room');

    // Send a chat messages to all connected sockets in a room when a message is received
    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        // Emit the 'chatMessage' event
        io.in(message.currentRoom).emit('chatMessage', message);
    });

    // Handle a socket joining a room
    socket.on('joinRoom', function(data){
        socket.join(data.roomName);
        socket.currentRoomId = data.roomId;
        io.emit('updateRooms');
    });

    // Handle a socket leaving a room
    socket.on('updateRooms', function(roomName){
        socket.leave(roomName);
        io.emit('updateRooms');
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        Room.findById(socket.currentRoomId).exec(function(err, room){
            // If we've actually found the current room
            if(null !== room) {
                // decrease the population by one
                room.population--;
                // And update the current room
                if (room.population > 0) {
                    room.save();
                }
                else {
                    room.remove();
                }
            }
        });
    });
};
