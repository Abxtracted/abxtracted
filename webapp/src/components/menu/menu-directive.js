(function(app){

  function appMenu(){
    return {
      restrict: 'E',
      templateUrl: '/components/menu/menu-template.html',
      replace: true
    };
  }

  app.directive('appMenu', appMenu);
})(window.app);
