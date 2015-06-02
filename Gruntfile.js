/**
 * Created by ecarter on 5/13/2015.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Define the Grunt configuration method
module.exports = function(grunt) {
    // Initialize Grunt configuraiton
    grunt.initConfig({
        // Configure the grunt-env task
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            }
        },
        // Configure the grunt-nodemon task
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ext: 'js,html',
                    watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
                }
            }
        },
        // Configure the mongo-drop task
        'mongo-drop': {
            options: {
                dbname: 'mean-test',
                host: 'localhost'
            }
        }
    });

    // Load the external Grunt tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mongo-drop-task');

    // Create the 'default' Grunt task
    grunt.registerTask('default', ['env:dev', 'nodemon']);
    grunt.registerTask('drop', ['mongo-drop']);
};