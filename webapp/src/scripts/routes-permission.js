(function(){
  'use strict';

  app.run(['$rootScope',
    '$state',
    'authService',
    function($rootScope, $state, authService){

      $rootScope.$on('$stateChangeStart', verifyRoutePermission);

      function verifyRoutePermission(evt, toState){
        if(!hasPermission(toState)) {
          evt.preventDefault();
          $state.go('login');
        }
      }

      function hasPermission(route){
        return (route && route.isPublic) || authService.isAuthenticated();
      }

  }]);

})();
