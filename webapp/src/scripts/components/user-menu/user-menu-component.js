(function(){
  'use strict';

  function userMenuController(authService){
    var _public = this;

    _public.logout = function(){
      authService.logout();
    };
  }

  app.component('userMenu', {
    templateUrl: '/components/user-menu/user-menu-template.html',
    controller: [
      'authService',
      userMenuController
    ]
  });

}());
