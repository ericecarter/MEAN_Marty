/**
 * Created by ecarter on 5/13/2015.
 */

exports.config = {
    specs: ['public/*[!lib]*/tests/e2e/*.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
        showColors: true
    }
}
