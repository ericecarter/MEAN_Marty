/**
 * Created by ecarter on 5/18/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Room = mongoose.model('Room');

// Create a new error handling controller method
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

// Create a new controller method that creates new rooms
exports.create = function(req, res) {
    // Create a new room object
    var room = new Room(req.body);

    // Try saving the room
    room.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the room
            res.json(room);
        }
    });
};

// Create a new controller method that retrieves the list of rooms
exports.list = function(req, res) {
    // Use the model 'find' method to get a list of rooms
    Room.find().exec(function(err, rooms) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the rooms
            res.json(rooms);
        }
    });
};

// Create a new controller method that returns an existing room
exports.read = function(req, res) {
    res.json(req.room);
};

// Create a new controller method that updates an existing room
exports.update = function(req, res) {
    // Get the room from the 'request' object
    var room = req.room;

    // Update the room fields
    room.roomName = req.body.roomName;
    room.population = req.body.population;

    // Try saving the updated room
    room.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the room
            res.json(room);
        }
    });
};

// Create a new controller method that deletes an existing room
exports.delete = function(req, res) {
    // Get the room from the 'request' object
    var room = req.room;

    // Use the model 'remove' method to delete the room
    room.remove(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the room
            res.json(room);
        }
    });
};

// Create a new controller middleware that retrieves a single existing room
exports.roomByID = function(req, res, next, id) {
    // Create a custom 'findByName' method to find a single room
    Room.findById(id).exec(function(err, room) {
        if (err) return next(err);
        if (!room) return next(new Error('Failed to load room ' + id));

        // If a room is found use the 'request' object to pass it to the next middleware
        req.room = room;

        // Call the next middleware
        next();
    });
};