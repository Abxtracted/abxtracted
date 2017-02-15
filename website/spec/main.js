(function(){

  // A bunch of constants
  var BASE_PATH = '/base'; // Karma serves files from '/base'
  var BASE_SCRIPTS_PATH = BASE_PATH + '/src/scripts/';
  var VENDORS_PATH = BASE_PATH + '/node_modules/';

  // Load all spec files
  var specFiles = [];
  var isSpecFile = function(filename){
    var regex = /spec\.js$/i;
    return regex.test(filename);
  };
  for (var filename in window.__karma__.files) {
    if (isSpecFile(filename))
      specFiles.push(filename);
  }

  require.config({
    baseUrl: BASE_SCRIPTS_PATH,
    paths: {
      'jquery': VENDORS_PATH + 'jquery/dist/jquery.min'
    },
    deps: specFiles,
    callback: window.__karma__.start
  });

}());
