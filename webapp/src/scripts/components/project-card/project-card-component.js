(function(){
  'use strict';

  function projectCardController(TRACK, trackService, routeService){
    var _public = this;

    _public.goToProjectDetails = function(){
      trackProjectCardClicked();
      routeService.go('app.projects-view', {
        projectId: _public.project.id
      });
    };

    function trackProjectCardClicked(){
      trackService.track(TRACK.PROJECTS.CARD_CLICKED, {
        id: _public.project.id,
        name: _public.project.name
      });
    }
  }

  app.component('projectCard', {
    templateUrl: '/components/project-card/project-card-template.html',
    controller: [
      'TRACK',
      'trackService',
      'routeService',
      projectCardController
    ],
    bindings: {
      project: '<'
    }
  });

}());
