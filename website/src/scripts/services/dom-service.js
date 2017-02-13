define('services/dom-service', [
    'jquery'
  ], function($){

  var _public = {};

  _public.get = function(selector){
    return $('[data-js=' + selector + ']');
  };

  return _public;

});
