(function(){
  'use strict';

  function newExperimentFormController(ERROR, $stateParams, $location, experimentsResource){
    var _public = this;

    _public.onProjectNameChange = function(projectName){
      projectName = parseProjectName(projectName);
      _public.experiment.name = projectName;
      _public.experiment.key = buildProjectKey(projectName);
    };

    _public.save = function(){
      delete _public.alert;

      experimentsResource.save({
        projectId: $stateParams.projectId,
        name: _public.experiment.name,
        key: _public.experiment.key
      }, onSaveSuccess, onSaveError);
    };

    function onSaveSuccess(){
      $location.path('projects/' + $stateParams.projectId);
    }

    function onSaveError(error){
      _public.alert = {
        type: 'error',
        message: ERROR.EXPERIMENT[error.data.key]
      }
    }

    function parseProjectName(projectName){
      projectName = projectName || '';
      return projectName.replace(/[^a-zA-Z0-9 ]/g,'');
    }

    function buildProjectKey(projectName){
      return projectName.toLowerCase().replace(/ /g,'_');
    }
  }

  app.component('newExperimentForm', {
    templateUrl: '/components/new-experiment-form/new-experiment-form-template.html',
    controller: [
      'ERROR',
      '$stateParams',
      '$location',
      'experimentsResource',
      newExperimentFormController
    ]
  });

}());
