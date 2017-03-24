define('routes', [
    'services/locationService',
    'views/home',
    'views/pricing',
    'views/docs',
    'views/contact'
  ], function(locationService, home, pricing, docs, contact){

    var _public = {};

    var routes = {
      '/': {
        viewModule: home
      },
      '/pricing': {
        viewModule: pricing
      },
      '/docs': {
        viewModule: docs
      },
      '/contact': {
        viewModule: contact
      }
    };

    _public.initViewModule = function(){
      var route = routes[locationService.path()];
      if(route)
        route.viewModule.init();
    };

    return _public;

});
