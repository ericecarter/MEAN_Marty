/**
 * Created by ecarter on 5/13/2015.
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'public/lib/angular/angular.js',
            'public/lib/angular-resource/angular-resource.js',
            'public/lib/angular-route/angular-route.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/lib/angular-cookies/angular-cookies.js',
            'public/application.js',
            'public/*[!lib]*/*.js',
            'public/*[!lib]*/*[!tests]*/*.js',
            'public/*[!lib]*/tests/unit/*.js'
        ],
        reporters: ['progress'], browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};

