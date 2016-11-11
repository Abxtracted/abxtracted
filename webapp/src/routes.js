(function(app){
   function configRoutes ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dash', {
        url: '/dash',
        templateUrl: '/views/dash/dash-template.html'
      });
  }

  angular.module('app').config(['$stateProvider', '$urlRouterProvider',
    configRoutes]);
})(window.app);
