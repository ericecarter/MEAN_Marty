/**
 * Created by ecarter on 5/20/2015.
 */
/**
 * Created by ecarter on 5/18/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Room = mongoose.model('Room');

// Define global test variables
var user, room;

// Create an 'Articles' controller test suite
describe('Room Controller Unit Tests:', function() {
    // Define a pre-tests function
    beforeEach(function(done) {
        // Create a new 'User' model instance
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });

        // Save the new 'User' model instance
        user.save(function() {
            room = new Room({
                roomName: 'roomName',
                population: 1
            });

            room.save(function(err) {
                done();
            });
        });
    });

    // Test the 'Room' GET methods
    describe('Testing the GET methods', function() {
        it('Should be able to get the list of rooms', function(done) {
            // Create a SuperTest request
            request(app).get('/api/rooms/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('roomName', room.roomName);
                    res.body[0].should.have.property('population', room.population);

                    done();
                });
        });

        it('Should be able to get the specific room', function(done) {
            // Create a SuperTest request
            request(app).get('/api/rooms/' + room._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.an.Object.and.have.property('roomName', room.roomName);
                    res.body.should.have.property('population', room.population);
                    done();
                });
        });
    });

    // Define a post-tests function
    afterEach(function(done) {
        // Clean the database
        Room.remove(function() {
            User.remove(function() {
                done();
            });
        });
    });
});