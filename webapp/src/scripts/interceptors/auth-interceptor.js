(function(){
  'use strict';

  app.factory('authInterceptor', ['$cookies', 'COOKIES',
    function($cookies, COOKIES){

    return {
      request: function(config){
        var token = $cookies.get(COOKIES.AUTH.TOKEN);
        config.headers = config.headers || {};
        if (token)
          config.headers['x-' + COOKIES.AUTH.TOKEN] = token;
        return config;
      }
    };

  }]);

})();