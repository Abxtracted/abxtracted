(function(){
  'use strict';

  function configRoutes ($stateProvider, $urlRouterProvider) {

    function getViewTemplate(view, layout){
      var layoutPath = '/';
      if(layout)
        layoutPath += layout + '/';
      return '/views' + layoutPath + view + '/' + view + '-template.html';
    }

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: getViewTemplate('login'),
      isPublic: true
    }).state('app', {
      url: '/app',
      templateUrl: getViewTemplate('app', 'app')
    }).state('app.dashboard', {
      url: '/dashboard',
      templateUrl: getViewTemplate('dashboard', 'app')
    }).state('app.projects', {
      url: '/projects/view/:projectId',
      templateUrl: getViewTemplate('project', 'app')
    }).state('app.projects-new', {
      url: '/projects/new',
      templateUrl: getViewTemplate('project-new', 'app')
    }).state('app.experiments-new', {
      url: '/projects/view/:projectId/experiments/new',
      templateUrl: getViewTemplate('experiment-new', 'app')
    });
  }

  angular.module('app')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      configRoutes
    ]);
})();
