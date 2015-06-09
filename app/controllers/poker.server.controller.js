// Invoke 'strict' JavaScript mode
'use strict';

// Create the poker configuration
module.exports = function(io, socket) {
	// Emit the status event when a new socket client is connected
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });

    // Send a poker messages to all connected sockets when a message is received
    socket.on('chatMessage', function(message) {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        // Emit the 'chatMessage' event
        io.in(message.currentRoom).emit('chatMessage', message);
    });

    // Handle a socket joining a room
    socket.on('joinRoom', function(roomName){
        socket.join(roomName);
        io.emit('updateRooms');
    });

    // Handle a socket leaving a room
    socket.on('updateRooms', function(roomName){
        socket.leave(roomName);
        io.emit('updateRooms');
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function() {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};
