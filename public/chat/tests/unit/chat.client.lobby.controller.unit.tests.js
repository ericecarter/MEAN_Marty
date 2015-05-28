/**
 * Created by ecarter on 5/26/2015.
 */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' module unit test suite
describe('Testing Lobby Controller', function() {
    // Define global variables
    var  _scope, LobbyController, roomService, roomServiceSpy;

    var mockRoomList = [
        {roomName: 'Room1',
        population: 1},
        {roomName: 'Room2',
        population: 2}
    ]

    // Define a pre-tests function
    beforeEach(module('mean'), function($provide){
        roomServiceSpy = jasmine.createSpyObj('Rooms', ['query']);
        roomServiceSpy.query.andReturn(mockRoomList);
        $provide.value('Rooms', roomServiceSpy);
    });

    beforeEach(inject(function(_$rootScope_, _$controller_, Rooms){
        _scope = _$rootScope_.$new();
        roomService = Rooms;

        LobbyController = _$controller_('LobbyController',{
            '$scope': _scope,
            'Rooms': roomService
        })
    }));
    describe('The Lobby Controller', function(){
    it('should initialize the scope correctly', function(){
        expect(_scope.roomsList).toBeDefined()
    })})
});