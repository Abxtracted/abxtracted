(function(){
  'use strict';

  function loginFormController($window, $state, authService){
    var _public = this;
    var AUTH_URL = 'http://localhost:8080/auth/login';
    var AUTH_REDIRECT_PARAM = 'redirect_to=http://localhost:3000/#';

    _public.login = function(){
      var url = [AUTH_URL, AUTH_REDIRECT_PARAM].join('?');
      $window.location.href = url;
    }

    if(authService.isAuthenticated())
      $state.go('dashboard');
  }

  app.component('loginForm', {
    templateUrl: '/components/login-form/login-form-template.html',
    controller: ['$window', '$state', 'authService', loginFormController]
  });

}());
