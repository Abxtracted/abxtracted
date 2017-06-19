(function(){
  'use strict';

  function userMenuController(TRACK, trackService, authService, routeService){
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
      trackProjectsItemClicked();
      routeService.go('app.projects');
    }

    function goToDocumention(){
      var url = environment.siteBaseUrl + 'docs';
      trackDocsItemClicked();
      routeService.url(url, true);
    }

    function logout(){
      trackLogoutItemClicked();
      authService.logout();
    }

    function trackProjectsItemClicked(){
      trackService.track(TRACK.USER_MENU.PROJETS_ITEM_CLICKED);
    }

    function trackDocsItemClicked(){
      trackService.track(TRACK.USER_MENU.DOCS_ITEM_CLICKED);
    }

    function trackLogoutItemClicked(){
      trackService.track(TRACK.USER_MENU.LOGOUT_ITEM_CLICKED);
    }
  }

  app.component('userMenu', {
    templateUrl: '/components/user-menu/user-menu-template.html',
    controller: [
      'TRACK',
      'trackService',
      'authService',
      'routeService',
      userMenuController
    ]
  });

}());
