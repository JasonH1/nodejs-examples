'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-wait');
  grunt.loadNpmTasks('grunt-mocha-webdriver');

  // Define the configuration for all the tasks
  grunt.initConfig({
    jscs: {
      src: [
        '*.js',
        'data/**/*.js',
        'app/**/*.js',
        'specs/**/*.js',
        'tests/**/*.js',
        'utils/**/*.js'
      ],
      options: {
        preset: 'airbnb',
        config: '.jscsrc'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'data/**/*.js',
        'app/**/*.js',
        'specs/**/*.js',
        'tests/**/*.js',
        'utils/**/*.js'
      ]
    },
    express: {
      local: {
        options: {
          script: 'server.js',
          port: 8085
        }
      }
    },
    wait: {
      options: {
        delay: 2000
      },
      pause: {
        options: {
          before: function(options) {
            // console.log('Waiting for server to start - %dms...', options.delay);
          },
          after: function() {
            // console.log('Starting tests...');
          }
        }
      }
    },
    // unit tests
    mochacov: {
      options: {
        timeout: 1000 * 10,
        reporter: 'spec'
      },
      all: ['specs/index.js']
    },
    // e2e tests
    mochaWebdriver: {
      options: {
        timeout: 1000 * 10,
        reporter: 'spec',
        usePromises: true
      },
      phantom: {
        src: ['tests/index.js'],
        options: {
          testName: 'phantom tests',
          usePhantom: true,
          phantomPort: 5555,
          browsers: []
        }
      }
    }
  });

  grunt.registerTask('e2e', ['express:local', 'wait:pause', 'mochaWebdriver:phantom']);
  grunt.registerTask('specs', ['mochacov']);

  grunt.registerTask('utils', function() {
    var done = this.async(),
      target = grunt.option('target'),
      env = grunt.option('env'),
      args = grunt.option('args');

    require('./utils/index')(grunt, done, env, target, args);
  });
};
