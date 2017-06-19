(function(){
  'use strict';

  function newProjectFormController(TRACK, PROJECT, trackService, routeService,
    projectsResource, textService, broadcastService){

    var _public = this;

    _public.$onInit = function(){
      trackProjectFormLoaded();
    };

    _public.save = function(){
      delete _public.alert;

      projectsResource.save({
        name: _public.project.name
      }).$promise.then(onSaveSuccess, onSaveError);
    };

    function onSaveSuccess(project){
      trackProjectCreated(project);
      routeService.go('app.projects-view', {
        projectId: project.id
      });
    }

    function onSaveError(error){
      var errorKey = getErrorKey(error);
      trackProjectFailedToCreate(error);
      _public.alert = {
        type: 'error',
        message: PROJECT.ERRORS[errorKey]
      };
    }

    function getErrorKey(error){
      if(error && error.data && error.data.key)
        return textService.toSnakeCase(error.data.key.toUpperCase());
      return 'UNKNOWN';
    }

    function trackProjectFormLoaded(){
      trackService.track(TRACK.PROJECTS.LOADED_FORM);
    }

    function trackProjectCreated(project){
      trackService.track(TRACK.PROJECTS.CREATED, {
        id: project.id,
        name: project.name
      });
    }

    function trackProjectFailedToCreate(error){
      trackService.track(TRACK.PROJECTS.FAILED_TO_CREATE, error);
    }
  }

  app.component('projectForm', {
    templateUrl: '/components/project-form/project-form-template.html',
    controller: [
      'TRACK',
      'PROJECT',
      'trackService',
      'routeService',
      'projectsResource',
      'textService',
      'broadcastService',
      newProjectFormController
    ]
  });

}());
