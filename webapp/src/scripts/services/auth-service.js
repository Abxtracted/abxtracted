(function(){

  app.service('authService', [
    'TRACK',
    'COOKIES',
    'trackService',
    '$cookies',
    'routeService',
    function(TRACK, COOKIES, trackService, $cookies, routeService){

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
        $cookies.remove(COOKIES.AUTH.TOKEN, {
          domain: environment.domain
        });
        trackLogout();
        routeService.go('login');
      };

      function trackLogout(){
        trackService.track(TRACK.LOGOUT);
      }

      return _public;

  }]);

}());
