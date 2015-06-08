/**
 * Created by ecarter on 6/3/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'chat' module Lobby page E2E test suite
describe('Lobby Page E2E Tests:',function(){
    var alphaBrowser, betaBrowser, gammaBrowser, deltaBrowser;

    // This block is a hack because beforeAll() is not available
    // Using Jasmine 2.0 causes some locators to fail
    it('Signs Up 4 New Users', function(){
        // Assign variable alphaBroswer to reference browser to allow uniform browser references
        alphaBrowser = browser;

        // Load the Homepage
        alphaBrowser.get('http://localhost:3000/#!/');

        // Create 4 new accounts
        // Click the sign-up link
        alphaBrowser.element(by.linkText('Signup')).click();
        // Get all the input fields
        alphaBrowser.driver.findElement(by.name('firstName')).sendKeys('Alpha');
        alphaBrowser.driver.findElement(by.name('lastName')).sendKeys('Alpha');
        alphaBrowser.driver.findElement(by.name('email')).sendKeys('alpha@email.com');
        alphaBrowser.driver.findElement(by.name('username')).sendKeys('alpha');
        alphaBrowser.driver.findElement(by.name('password')).sendKeys('abc123');
        alphaBrowser.driver.findElement(by.css('[type="submit"]')).click();
        alphaBrowser.element(by.linkText('Chat Lobby')).click();

        // Fork creates a new browser window
        betaBrowser = browser.forkNewDriverInstance(true);
        // Click the sign-up link
        betaBrowser.element(by.linkText('Signup')).click();
        // Get all the input fields
        betaBrowser.driver.findElement(by.name('firstName')).sendKeys('Beta');
        betaBrowser.driver.findElement(by.name('lastName')).sendKeys('Beta');
        betaBrowser.driver.findElement(by.name('email')).sendKeys('beta@email.com');
        betaBrowser.driver.findElement(by.name('username')).sendKeys('beta');
        betaBrowser.driver.findElement(by.name('password')).sendKeys('abc123');
        betaBrowser.driver.findElement(by.css('[type="submit"]')).click();
        betaBrowser.element(by.linkText('Chat Lobby')).click();

        gammaBrowser = browser.forkNewDriverInstance(true);
        // Click the sign-up link
        gammaBrowser.element(by.linkText('Signup')).click();
        // Get all the input fields
        gammaBrowser.driver.findElement(by.name('firstName')).sendKeys('Gamma');
        gammaBrowser.driver.findElement(by.name('lastName')).sendKeys('Gamma');
        gammaBrowser.driver.findElement(by.name('email')).sendKeys('gamma@email.com');
        gammaBrowser.driver.findElement(by.name('username')).sendKeys('gamma');
        gammaBrowser.driver.findElement(by.name('password')).sendKeys('abc123');
        gammaBrowser.driver.findElement(by.css('[type="submit"]')).click();
        gammaBrowser.element(by.linkText('Chat Lobby')).click();


        deltaBrowser = browser.forkNewDriverInstance(true);
        // Click the sign-up link
        deltaBrowser.element(by.linkText('Signup')).click();
        // Get all the input fields
        deltaBrowser.driver.findElement(by.name('firstName')).sendKeys('Delta');
        deltaBrowser.driver.findElement(by.name('lastName')).sendKeys('Delta');
        deltaBrowser.driver.findElement(by.name('email')).sendKeys('delta@email.com');
        deltaBrowser.driver.findElement(by.name('username')).sendKeys('delta');
        deltaBrowser.driver.findElement(by.name('password')).sendKeys('abc123');
        deltaBrowser.driver.findElement(by.css('[type="submit"]')).click();
        deltaBrowser.element(by.linkText('Chat Lobby')).click();


        // All browsers are signed up and in the lobby
        expect(alphaBrowser.getLocationAbsUrl()).toBe('/chat/lobby');
        expect(betaBrowser.getLocationAbsUrl()).toBe('/chat/lobby');
        expect(gammaBrowser.getLocationAbsUrl()).toBe('/chat/lobby');
        expect(deltaBrowser.getLocationAbsUrl()).toBe('/chat/lobby');
    });



    it('Should be possible to create a room; other lobbies acknowledge the change', function(){
        // All browsers should have empty room lists
        expect(alphaBrowser.element(by.repeater('rooms in roomList').row(0)).isPresent()).toBe(false);
        expect(betaBrowser.element(by.repeater('rooms in roomList').row(0)).isPresent()).toBe(false);
        expect(gammaBrowser.element(by.repeater('rooms in roomList').row(0)).isPresent()).toBe(false);
        expect(deltaBrowser.element(by.repeater('rooms in roomList').row(0)).isPresent()).toBe(false);

        // Alpha browser clicks create a new room
        alphaBrowser.element(by.buttonText('Create a New Room')).click();
        // Alpha browser is now in a room
        expect(alphaBrowser.getLocationAbsUrl()).toBe('/chat/room');

        // The room lists in the other browsers are updated
        var betaLobbyRoomListRow0 = betaBrowser.element(by.repeater('rooms in roomList').row(0));
        var gammaLobbyRoomListRow0 = gammaBrowser.element(by.repeater('rooms in roomList').row(0));
        var deltaLobbyRoomListRow0 = deltaBrowser.element(by.repeater('rooms in roomList').row(0));

        expect(betaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 1');
        expect(gammaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 1');
        expect(deltaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 1');


        // Only one row (row 0) is present
        expect(betaBrowser.element(by.repeater('rooms in roomList').row(1)).isPresent()).toBe(false);
        expect(gammaBrowser.element(by.repeater('rooms in roomList').row(1)).isPresent()).toBe(false);
        expect(deltaBrowser.element(by.repeater('rooms in roomList').row(1)).isPresent()).toBe(false);
    })
    it('Should be possible to join an existing room; other lobbies should update', function(){
        // Beta joins Alpha's room
        var betaLobbyRoomListRow0 = betaBrowser.element(by.repeater('rooms in roomList').row(0));
        betaLobbyRoomListRow0.element(by.buttonText('Join This Room')).click();
        expect(betaBrowser.getLocationAbsUrl()).toBe('/chat/room');

        // The room lists in the other browsers are updated
        var gammaLobbyRoomListRow0 = gammaBrowser.element(by.repeater('rooms in roomList').row(0));
        var deltaLobbyRoomListRow0 = deltaBrowser.element(by.repeater('rooms in roomList').row(0));

        expect(gammaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 2');
        expect(deltaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 2');


        // Only one row (row 0) is present
        expect(gammaBrowser.element(by.repeater('rooms in roomList').row(1)).isPresent()).toBe(false);
        expect(deltaBrowser.element(by.repeater('rooms in roomList').row(1)).isPresent()).toBe(false);
    });
    it('Should be possible to have multiple rows of rooms', function(){
        // Gamma browser clicks create a new room
        gammaBrowser.element(by.buttonText('Create a New Room')).click();
        // Gamma browser is now in a room
        expect(gammaBrowser.getLocationAbsUrl()).toBe('/chat/room');

        // The room lists in the other browser is updated
        var deltaLobbyRoomListRow0 = deltaBrowser.element(by.repeater('rooms in roomList').row(0));
        var deltaLobbyRoomListRow1 = deltaBrowser.element(by.repeater('rooms in roomList').row(1));

        expect(deltaLobbyRoomListRow0.getText()).toMatch('Number of people in this room: 2');
        expect(deltaLobbyRoomListRow1.getText()).toMatch('Number of people in this room: 1');


        // Only two rows (rows 0 & 1) are present
        expect(deltaBrowser.element(by.repeater('rooms in roomList').row(2)).isPresent()).toBe(false);

        // Manually quit extra browsers to avoid ECONNREFUSED connect ECONNREFUSED error message
        betaBrowser.quit();
        gammaBrowser.quit();
        deltaBrowser.quit();
    });
    // This is another hack due to afterAll() not being available
    it('Should log Alpha out', function(){
        // Sign-out alpha
        alphaBrowser.get('http://localhost:3000/#!/');
        alphaBrowser.element(by.linkText('Signout')).click();
    });
});