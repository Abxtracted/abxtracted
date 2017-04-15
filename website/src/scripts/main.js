(function(){

  var VENDORS_PATH = 'vendor/scripts/';

  require.config({
    paths: {
      'jquery': VENDORS_PATH + 'jquery.min',
      'highlightjs': VENDORS_PATH + 'highlightjs.min'
    }
  });

}());
