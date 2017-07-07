(function(){
  'use strict';

  function loginFormController(TRACK, $window, trackService, routeService,
    authService){

    var GOOGLE_SIGNUP_ONLY_WARNING_MSG = 'For now, you can sign up with Google ' +
                                          'only, but don\'t worry, we are going ' +
                                          'to release signup via email very soon ' +
                                          'and you will be notified about that ' +
                                          'on: $email';

    var _public = this;

    _public.$onInit = function(){
      trackLoginLoaded();
      configGoogleSignupOnlyWarning();
    };

    _public.login = function(){
      trackLoginBtnClicked();
      authService.login();
    };

    function trackLoginLoaded(){
      trackService.track(TRACK.LOGIN.LOADED);
    }

    function configGoogleSignupOnlyWarning(){
      var emailAddress = routeService.getParams('emailAddress');
      if(emailAddress)
        _public.alert = {
          type: 'warn',
          message: GOOGLE_SIGNUP_ONLY_WARNING_MSG.replace('$email', emailAddress)
        };
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
