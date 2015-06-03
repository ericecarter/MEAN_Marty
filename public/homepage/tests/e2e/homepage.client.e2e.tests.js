/**
 * Created by ecarter on 6/2/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'homepage' module E2E test suite
describe('Homepage E2E Tests:', function() {
    // Test the sign-in functionality
    describe('A New User Signing-up', function() {
        var firstName, lastName, email, username, password, submit, flash;

        beforeEach(function(){
            // Load the Homepage
            browser.get('http://localhost:3000/#!/');

            // These links should not appear unless authenticated
            expect(element(by.linkText('Chat Lobby')).isPresent()).toBe(false);
            expect(element(by.linkText('Signout')).isPresent()).toBe(false);

            // Click the sign-up link
            element(by.linkText('Signup')).click();

            // Current url should be sign-up page
            expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

            // Get all the input fields
            firstName =  browser.driver.findElement(by.name('firstName'));
            lastName =  browser.driver.findElement(by.name('lastName'));
            email =  browser.driver.findElement(by.name('email'));
            username =  browser.driver.findElement(by.name('username'));
            password =  browser.driver.findElement(by.name('password'));
            submit = browser.driver.findElement(by.css('[type="submit"]'));
        });

        it('Should be possible to create a new account', function() {
            // Input valid data and click submit
            firstName.sendKeys('John');
            lastName.sendKeys('Doe');
            email.sendKeys('jdoe@email.com');
            username.sendKeys('jdoe');
            password.sendKeys('abc123');
            submit.click();

            // Test Assertions
            // Upon successful registration the user will be taken to '/'
            expect(browser.getLocationAbsUrl())
                .toBe('/');
            // The page should have a heading welcoming the user
            var heading = element(by.css('h1'));
            expect(heading.getText()).toEqual('Hello John Doe');

            // New links should appear for authenticated users
            expect(element(by.linkText('Chat Lobby')).isPresent()).toBe(true);
            expect(element(by.linkText('Signout')).isPresent()).toBe(true);

            // Click the sign-out link
            element(by.linkText('Signout')).click();
        });

        describe('Should prevent a user from signing-up with invalid data', function(){
            it('Should require a first name', function(){
                // Hit the submit button with empty fields
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // First name error message should appear
                expect(flash.getText()).toEqual('First name is required');
            });
            it('Should require a last name', function(){
                // Enter a first name
                firstName.sendKeys('John');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Last name error message should appear
                expect(flash.getText()).toEqual('Last name is required');
            });
            it('Should require an email address', function(){
                // Fill-out some fields
                firstName.sendKeys('John');
                lastName.sendKeys('Doe');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Email address error message should appear
                expect(flash.getText()).toEqual('Email address is required');
            });
            it('Should require a valid email address', function(){
                // Fill-out some fields
                firstName.sendKeys('John');
                lastName.sendKeys('Doe');
                email.sendKeys('jdoe');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Invalid email address error message should appear
                expect(flash.getText()).toEqual('Please fill a valid email address');
            });
            it('Should require a username address', function(){
                // Fill-out some fields
                firstName.sendKeys('John');
                lastName.sendKeys('Doe');
                email.sendKeys('jdoe@email.com');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Username error message should appear
                expect(flash.getText()).toEqual('Username is required');
            });
            it('Should require a password', function(){
                // Fill-out some fields
                firstName.sendKeys('John');
                lastName.sendKeys('Doe');
                email.sendKeys('jdoe@email.com');
                username.sendKeys('jdoe');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password error message should appear
                expect(flash.getText()).toEqual('Password is required');
            });
            it('Should require a valid password', function(){
                // Fill-out some fields
                firstName.sendKeys('John');
                lastName.sendKeys('Doe');
                email.sendKeys('jdoe@email.com');
                username.sendKeys('jdoe');
                password.sendKeys('abc12');
                submit.click();

                // Browser should remain on sign-up page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signup');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password too short error message should appear
                expect(flash.getText()).toEqual('Password should be longer');
            })
        })
    });
    // Test the sign-in functionality
    describe('A returning user',function() {
        var username, password, submit, flash;
        beforeEach(function () {
            // Load the Homepage
            browser.get('http://localhost:3000/#!/');

            // These links should not appear unless authenticated
            expect(element(by.linkText('Chat Lobby')).isPresent()).toBe(false);
            expect(element(by.linkText('Signout')).isPresent()).toBe(false);

            // Click the sign-up link
            element(by.linkText('Signin')).click();

            // Current url should be sign-up page
            expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

            // Get all the input fields
            username = browser.driver.findElement(by.name('username'));
            password = browser.driver.findElement(by.name('password'));
            submit = browser.driver.findElement(by.css('[type="submit"]'));
        });
        it('Should be possible to log-in a returning user', function () {
            // Input valid data and click submit
            username.sendKeys('jdoe');
            password.sendKeys('abc123');
            submit.click();

            // Test Assertions
            // Upon successful log-in the user will be taken to '/'
            expect(browser.getLocationAbsUrl())
                .toBe('/');
            // The page should have a heading welcoming the user
            var heading = element(by.css('h1'));
            expect(heading.getText()).toEqual('Hello John Doe');

            // New links should appear for authenticated users
            expect(element(by.linkText('Chat Lobby')).isPresent()).toBe(true);
            expect(element(by.linkText('Signout')).isPresent()).toBe(true);

            // Click the sign-out link
            element(by.linkText('Signout')).click();
        });
        describe('Should prevent a user from signing-in with invalid data ',function(){
            it('Should require a username', function () {
                // Click the submit button with empty input fields
                submit.click();

                // Browser should remain on the sign-in page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password too short error message should appear
                expect(flash.getText()).toEqual('Missing credentials');
            });
            it('Should require a password', function () {
                // Fill out some fields
                username.sendKeys('jdoe');
                submit.click();

                // Browser should remain on the sign-in page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password too short error message should appear
                expect(flash.getText()).toEqual('Missing credentials');
            });
            it('Should require a valid password', function () {
                // Fill out some fields
                username.sendKeys('jdoe');
                password.sendKeys('abc12');
                submit.click();

                // Browser should remain on the sign-in page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password too short error message should appear
                expect(flash.getText()).toEqual('Invalid password');
            });
            it('Should require a valid user', function () {
                // Fill out some fields
                username.sendKeys('alpha0');
                password.sendKeys('beta11');
                submit.click();

                // Browser should remain on the sign-in page
                expect(browser.driver.getCurrentUrl()).toBe('http://localhost:3000/signin');

                // Get the flash error message div
                flash = browser.driver.findElement(by.className('flash'));

                // Password too short error message should appear
                expect(flash.getText()).toEqual('Unknown user');
            })
        })
    });
});