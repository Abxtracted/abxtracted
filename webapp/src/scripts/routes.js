(function(){
  'use strict';

  function configRoutes ($stateProvider, $urlRouterProvider) {

    function getViewTemplate(view){
      return '/views/' + view + '/' + view + '-template.html';
    }

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login', {
      url: '/login',
      isPublic: true,
      templateUrl: getViewTemplate('login')
    }).state('dashboard', {
      url: '/dashboard',
      templateUrl: getViewTemplate('dashboard')
    }).state('projects-new', {
      url: '/projects/new',
      templateUrl: getViewTemplate('new-project')
    }).state('projects', {
      url: '/projects/:id',
      templateUrl: getViewTemplate('project')
    }).state('experiments-new', {
      url: '/experiments/new',
      templateUrl: getViewTemplate('new-experiment')
    });
  }

  angular.module('app')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      configRoutes
    ]);
})();
