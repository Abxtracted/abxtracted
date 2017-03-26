define('services/locationService', [
    'providers'
  ], function(providers){

    var _public = {};

    _public.url = function(url){
      if(url)
        providers.$location.href = url;
      else
        return providers.$location.href;
    };

    _public.path = function(path){
      if(path)
        providers.$location.pathname = path;
      else
        return providers.$location.pathname;
    };

    _public.goToApp = function(){
      _public.url(environment.appBaseUrl);
    };

    _public.goToWebisteHome = function(){
      _public.path('/');
    }

    return _public;

});
