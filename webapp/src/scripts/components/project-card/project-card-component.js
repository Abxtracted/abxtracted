(function(){
  'use strict';

  function projectCardController(routeService){
    var _public = this;

    _public.goToProjectDetails = function(){
      routeService.go('app.projects-view', {
        projectId: _public.project.id
      });
    };
  }

  app.component('projectCard', {
    templateUrl: '/components/project-card/project-card-template.html',
    controller: [
      'routeService',
      projectCardController
    ],
    bindings: {
      project: '<'
    }
  });

}());
