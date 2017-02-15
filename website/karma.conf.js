var fs = require('fs');
var project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],


    // list of files / patterns indexOf to load in the browser
    files: [
      {pattern: project.paths.scripts.vendor.requirejs, included: true},
      {pattern: project.paths.scripts.source.files, included: false},
      {pattern: project.paths.scripts.spec.files, included: false},
      {pattern: project.paths.scripts.spec.main, included: true}
    ],


    // list of files to exclude
    exclude: [
      project.paths.scripts.source.main,
      project.paths.scripts.source.boot
    ],

    plugins: [
      'karma-jasmine-jquery',
      'karma-jasmine',
      'karma-requirejs',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      dir : 'coverage/',
      reporters: [
          { type: 'html', subdir: 'report-html' },
          { type: 'text', subdir: '.' }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values:
    // config.LOG_DISABLE
    // config.LOG_ERROR
    // config.LOG_WARN
    // config.LOG_INFO
    //config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};