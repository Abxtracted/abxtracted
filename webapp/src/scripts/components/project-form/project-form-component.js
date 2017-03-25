(function(){
  'use strict';

  function newProjectFormController(BROADCAST, PROJECT, routeService,
    projectsResource, textService, broadcastService){

    var _public = this;

    _public.save = function(){
      delete _public.alert;

      projectsResource.save({
        name: _public.project.name
      }).$promise.then(onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(project){
      broadcastService.publish(BROADCAST.PROJECT.CREATED);
      routeService.go('app.projects', {
        projectId: project.id
      });
    }

    function onSaveError(error){
      var error = textService.toSnakeCase(error.data.key.toUpperCase());
      _public.alert = {
        type: 'error',
        message: PROJECT.ERRORS[error]
      };
    }
  }

  app.component('projectForm', {
    templateUrl: '/components/project-form/project-form-template.html',
    controller: [
      'BROADCAST',
      'PROJECT',
      'routeService',
      'projectsResource',
      'textService',
      'broadcastService',
      newProjectFormController
    ]
  });

}());
