(function(){

  app.service('authService', [
    'COOKIES',
    '$cookies',
    '$location',
    function(COOKIES, $cookies, $location){

      var _public = {};

      _public.isAuthenticated = function(){
        return $cookies.get(COOKIES.AUTH.TOKEN);
      };

      _public.logout = function(){
        $cookies.remove(COOKIES.AUTH.TOKEN);
        $location.path('/login');
      };

      return _public;

  }]);

}());
