(function(){

  app.service('routeService', [
    '$window',
    '$state',
    '$stateParams',
    function($window, $state, $stateParams){

    var _public = {};

    _public.url = function(url, shouldOpenInNewTab){
      var location = $window.location;
      if(url && shouldOpenInNewTab)
        $window.open(url);
      else if(url)
        location.href = url;
      else
        return location.href;
    };

    _public.go = function(state, params){
      $state.go(state, params);
    };

    _public.getParams = function(param){
      if(param)
        return $stateParams[param];
      return $stateParams;
    };

    return _public;

  }]);

}());
