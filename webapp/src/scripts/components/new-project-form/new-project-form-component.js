(function(){
  'use strict';

  function newProjectFormController(ERROR, $location, projectsResource){
    var _public = this;

    _public.save = function(){
      delete _public.alert;

      projectsResource.save({
        name: _public.project.name
      }, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(project){
      $location.path('/projects/' + project.id);
    }

    function onSaveError(error){
      _public.alert = {
        type: 'error',
        message: ERROR.PROJECT[error.data.key]
      };
    }
  }

  app.component('newProjectForm', {
    templateUrl: '/components/new-project-form/new-project-form-template.html',
    controller: [
      'ERROR',
      '$location',
      'projectsResource',
      newProjectFormController
    ]
  });

}());
