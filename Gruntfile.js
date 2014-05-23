var path = require("path");

module.exports = function(grunt) {
    'use strict';

    // Load every grunt module. No need to add it manually.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        jshint: {
            all: [
                'Gruntfile.js',
                'uxfirst.js'
            ]
        },

        uglify: {
            client: {
                files: {
                    'uxfirst.min.js': ['uxfirst.js']
                }
            },
            options: {
                banner: '/* UXFirst <%= pkg.version %> http://github.com/gmetais/UXFirst */\n'
            }
        }

    });

    grunt.registerTask('default', [
        'jshint',
        'uglify'
    ]);
};