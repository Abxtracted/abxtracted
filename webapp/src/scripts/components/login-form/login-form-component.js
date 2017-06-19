(function(){
  'use strict';

  function loginFormController(TRACK, $window, trackService, routeService,
    authService){

    var _public = this;

    _public.$onInit = function(){
      trackLoginLoaded();
    };

    _public.login = function(){
      trackLoginBtnClicked();
      authService.login();
    };

    function trackLoginLoaded(){
      trackService.track(TRACK.LOGIN.LOADED);
    }

    function trackLoginBtnClicked(){
      trackService.track(TRACK.LOGIN.BTN_CLICKED);
    }

    if(authService.isAuthenticated())
      routeService.go('app.projects');
  }

  app.component('loginForm', {
    templateUrl: '/components/login-form/login-form-template.html',
    controller: [
      'TRACK',
      '$window',
      'trackService',
      'routeService',
      'authService',
      loginFormController
    ]
  });

}());
