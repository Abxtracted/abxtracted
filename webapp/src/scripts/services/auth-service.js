(function(){

  app.service('authService', [
    '$cookies',
    'COOKIES',
    function($cookies, COOKIES){

      var _public = {};

      _public.isAuthenticated = function(){
        return $cookies.get(COOKIES.AUTH.TOKEN);
      };

      return _public;

  }]);

}());
