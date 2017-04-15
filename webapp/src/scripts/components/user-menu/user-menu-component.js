(function(){
  'use strict';

  function userMenuController(authService, routeService){
    var _public = this;

    _public.logout = function(){
      authService.logout();
    };

    _public.goToDocumention = function(){
      var url = environment.siteBaseUrl + 'docs';
      routeService.url(url);
    };
  }

  app.component('userMenu', {
    templateUrl: '/components/user-menu/user-menu-template.html',
    controller: [
      'authService',
      'routeService',
      userMenuController
    ]
  });

}());
