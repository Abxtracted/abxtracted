define('app', [
    'components/topbar',
    'routes'
  ], function(topbar, routes){

    var _public = {};

    _public.init = function(){
      topbar.init();
      routes.initViewModule();
    }

    return _public;

});
