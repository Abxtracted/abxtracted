(function(){
  'use strict';

  app.config(['$httpProvider', function($httpProvider){

    $httpProvider.interceptors.push('authInterceptor');

  }]);

})();
