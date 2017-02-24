/*
 * grunt-css-injector
 * https://github.com/vmol/grunt-css-injector
 *
 * Copyright (c) 2017 Víctor Molero (Tlmark)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput:''
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    css_injector: {
      default_options:{
        files:{
          'test/fixtures/default.html':[ 'test/fixtures/style-a.css','test/fixtures/style-b.css']
        }
      },
      custom_options:{
        options:{
          openTag  : "@section('inline-css')",
          closeTag : '@stop'
        },
        files:{
          'test/fixtures/custom.blade.php':[ 'test/fixtures/style-a.css','test/fixtures/style-b.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'css_injector', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
