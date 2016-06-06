// Karma configuration
// Generated on Fri May 27 2016 17:18:02 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'public/core.js',

//         'public/services/*.js',
        'public/services/AuthenticationData.js',
        'public/profile/CtrlUserManager.js',
        'public/services/Class.js',
        'public/services/User.js',
        'public/services/Director.js',
        'public/services/Student.js',
        'public/services/RequestClass.js',

//         'tests/unit/client/*.js',
        'tests/unit/client/AuthenticationDataTest.js', //ok
        'tests/unit/client/CtrlUserManagerTest.js', //ok
        'tests/unit/client/ClassTest.js', //ok
        'tests/unit/client/UserTest.js', //ok
        'tests/unit/client/DirectorTest.js', //ok
        'tests/unit/client/StudentTest.js', //DA FINIRE
        'tests/unit/client/RequestClassTest.js' //ok
//         'tests/integration/*.js'
    ],


    // list of files to exclude
    exclude: [
        'tests/unit/db/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    
    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'tdd'
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    port: 8080,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],

    singleRun: false,

    concurrency: Infinity
  });
};
