(function(){
  'use strict';

  function loginFormController($window, routeService, authService){
    var _public = this;

    _public.login = function(){
      authService.login();
    };

    if(authService.isAuthenticated())
      routeService.go('app.dashboard');
  }

  app.component('loginForm', {
    templateUrl: '/components/login-form/login-form-template.html',
    controller: [
      '$window',
      'routeService',
      'authService',
      loginFormController
    ]
  });

}());
