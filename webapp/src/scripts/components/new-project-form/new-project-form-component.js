(function(){
  'use strict';

  function newProjectFormController($location, projectsResource){
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
      '$location',
      'projectsResource',
      newProjectFormController
    ]
  });

}());
