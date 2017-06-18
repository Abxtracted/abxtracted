(function(){
  'use strict';

  function userMenuController(authService, routeService){
    var _public = this;

    _public.items = [{
      text:'Projects',
      icon: 'ion-ios-briefcase',
      action: goToProjectList
    }, {
      text:'Docs',
      icon: 'ion-ios-book',
      action: goToDocumention
    }, {
      text:'Logout',
      icon: 'ion-log-out',
      action: logout
    }];

    function goToProjectList(){
      routeService.go('app.projects');
    }

    function goToDocumention(){
      var url = environment.siteBaseUrl + 'docs';
      routeService.url(url, true);
    }

    function logout(){
      authService.logout();
    }
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
