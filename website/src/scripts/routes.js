define('routes', [
    'providers',
    'views/home'
  ], function(providers, home){

    var _public = {};

    var routes = {
      '/': {
        viewModule: home
      }
    };

    _public.initViewModule = function(){
      var module = routes[providers.$location.pathname].viewModule;
      if(module)
        module.init();
      else
        providers.$location.pathname = '/';
    };

    return _public;

});
