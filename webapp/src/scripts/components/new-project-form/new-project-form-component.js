(function(){
  'use strict';

  function newProjectFormController(BROADCAST, $location, projectsResource, broadcastService){
    var _public = this;

    _public.save = function(){
      projectsResource.save({
        name: _public.project.name
      }, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(project){
      $location.path('/projects/' + project.id);
    }

    function onSaveError(error){
      console.warn('error: ' + error);
    }
  }

  app.component('newProjectForm', {
    templateUrl: '/components/new-project-form/new-project-form-template.html',
    controller: [
      'BROADCAST',
      '$location',
      'projectsResource',
      'broadcastService',
      newProjectFormController
    ]
  });

}());
