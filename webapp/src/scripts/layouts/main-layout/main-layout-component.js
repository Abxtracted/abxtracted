(function(){
  'use strict';

  function mainLayoutController(){

  }

  app.component('mainLayout', {
    templateUrl: '/layouts/main-layout/main-layout-template.html',
    transclude: true,
    bindings: {
      viewportTitle: '@'
    },
    controller: mainLayoutController
  });

}());
