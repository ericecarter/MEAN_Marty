/**
 * Created by ecarter on 6/2/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'homepage' module E2E test suite
describe('Homepage E2E Tests:', function() {
    // Test the Homepage
    describe('New User Signing-up', function() {
        it('Should be able to create a new account', function() {
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
            var firstName =  browser.driver.findElement(by.name('firstName'));
            var lastName =  browser.driver.findElement(by.name('lastName'));
            var email =  browser.driver.findElement(by.name('email'));
            var username =  browser.driver.findElement(by.name('username'));
            var password =  browser.driver.findElement(by.name('password'));
            var submit = browser.driver.findElement(by.css('[type="submit"]'));

            // Input valid data and click submit
            firstName.sendKeys('John');
            lastName.sendKeys('Doe');
            email.sendKeys('jdoe@email.com');
            username.sendKeys('jdoe');
            password.sendKeys('abc123');
            submit.click()

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
        });
    });
});