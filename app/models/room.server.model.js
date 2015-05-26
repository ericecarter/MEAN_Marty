/**
 * Created by ecarter on 5/18/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'RoomSchema'
var RoomSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    roomName: {
        type: String,
        default: '',
        unique: true,
        required: "Name cannot be blank"
    },
    population: Number
});

// Create the 'Room' model out of the 'RoomSchema'
mongoose.model('Room', RoomSchema);