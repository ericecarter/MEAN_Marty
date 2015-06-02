# MEAN_Marty
Poker application written to try out MEAN stack

To install you must have Node.js installed.

Use NPM to install bower: For Windows Users enter $ npm install -g bower

Clone the repository and in the application's root folder run: $ npm install and $ bower install

To start the server just enter: $ grunt

To test, Mocha must be installed: For Windows Users enter $ npm install -g mocha

Also Karma command-line tool must be installed: For Windows Users enter $ npm install -g karma-cli

Then set up the environment, in Windows: $ set NODE_ENV=test

For all tests set the environment to test

To run the Mocha tests Windows users enter: $ mocha --reporter spec app/tests

To run the Karma tests Windows users enter: $ karma start

To run the E2E's, first install Protractor: Window users enter $ npm install -g protractor

Protractor will need a working WebDriver server, to download and install a standalone Selenium

server enter the following into the command line: $ webdriver-manager update

To run Protractor first start the server with: $ node server

Then in another command line window enter: $ protractor

To clean up the database after tests enter: $ grunt drop
