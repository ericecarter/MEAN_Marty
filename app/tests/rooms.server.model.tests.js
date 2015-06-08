/**
 * Created by ecarter on 5/18/2015.
 */
var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Room = mongoose.model('Room');

var user, room;

describe('Room Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });
        user.save(function() {
            room = new Room({
                roomName: 'roomName',
                population: 1
            });
            room.save();
            done();
        });
    });
    describe('Testing the save method', function() {
        it('Should be able to save a room without problems', function() {
            room.save(function(err) {
                should.not.exist(err);
            });
        });
        it('Should not be able to save a room without a name', function() {
            room.roomName = '';
            room.save(function(err) {
                should.exist(err);
            });
        });
    });
    describe('Testing the find methods', function() {
        it('Should be able to find rooms without problems', function() {
            var query = Room.find();
            query.exec(function (err, rooms) {
                should.not.exist(err);
                rooms.should.be.an.instanceof(Array);
            })
        });
        it('Should be able to find a single room without problems', function() {
            var query = Room.find({_id : room._id});
            query.exec(function (err, aRoom) {
                should.not.exist(err);
                aRoom[0].should.be.an.Object;
                aRoom[0].should.have.property('roomName', 'roomName');
                aRoom[0].should.have.property('population', 1);
            })
        });
    });
    describe('Testing the delete method', function() {
        it('Should be able to delete a room without problems', function() {
            room.remove(function(err) {
                should.not.exist(err);
            });
        });
    });
    afterEach(function(done) {
        Room.remove(function() {
            User.remove(function() {
                done();
            });
        });
    });
});

