(function(){

  app.service('authService', [
    'COOKIES',
    '$cookies',
    'routeService',
    function(COOKIES, $cookies, routeService){

      var AUTH_URL = environment.apiBaseUrl + 'auth/login';
      var AUTH_REDIRECT_PARAM = 'redirect_to=' + environment.appBaseUrl;

      var _public = {};

      _public.login = function(){
        var url = [AUTH_URL, AUTH_REDIRECT_PARAM].join('?');
        routeService.url(url);
      };

      _public.isAuthenticated = function(){
        return $cookies.get(COOKIES.AUTH.TOKEN);
      };

      _public.logout = function(){
        $cookies.remove(COOKIES.AUTH.TOKEN);
        routeService.go('login');
      };

      return _public;

  }]);

}());
