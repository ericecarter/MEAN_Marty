/**
 * Created by ecarter on 5/18/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
    rooms = require('../../app/controllers/rooms.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'rooms' base routes
    app.route('/api/rooms')
        .get(rooms.list)
        .post(users.requiresLogin, rooms.create);

    // Set up the 'rooms' parameterized routes
    app.route('/api/rooms/:roomId')
        .get(rooms.read)
        .put(users.requiresLogin, rooms.update)
        .delete(users.requiresLogin, rooms.delete);

    // Set up the 'roomName' parameter middleware
    app.param('roomId', rooms.roomByID);
};