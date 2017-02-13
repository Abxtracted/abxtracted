define('app', [
    'routes'
  ], function(routes){

    var _public = {};

    _public.init = function(){
      routes.initViewModule();
    }

    return _public;

});
