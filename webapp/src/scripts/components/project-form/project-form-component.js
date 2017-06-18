(function(){
  'use strict';

  function newProjectFormController(PROJECT, routeService,
    projectsResource, textService, broadcastService){

    var _public = this;

    _public.save = function(){
      delete _public.alert;

      projectsResource.save({
        name: _public.project.name
      }).$promise.then(onSaveSuccess, onSaveError);
    };

    function onSaveSuccess(project){
      routeService.go('app.projects-view', {
        projectId: project.id
      });
    }

    function onSaveError(error){
      var errorKey = textService.toSnakeCase(error.data.key.toUpperCase());
      _public.alert = {
        type: 'error',
        message: PROJECT.ERRORS[errorKey]
      };
    }
  }

  app.component('projectForm', {
    templateUrl: '/components/project-form/project-form-template.html',
    controller: [
      'PROJECT',
      'routeService',
      'projectsResource',
      'textService',
      'broadcastService',
      newProjectFormController
    ]
  });

}());
