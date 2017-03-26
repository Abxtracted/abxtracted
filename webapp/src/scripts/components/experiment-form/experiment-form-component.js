(function(){
  'use strict';

  function experimentFormController(EXPERIMENT, routeService, experimentsResource, textService){
    var _public = this;

    _public.onProjectNameChange = function(projectName){
      projectName = parseProjectName(projectName);
      _public.experiment.name = projectName;
      _public.experiment.key = buildProjectKey(projectName);
    };

    _public.save = function(){
      delete _public.alert;

      experimentsResource.save({
        projectId: getProjectId(),
        name: _public.experiment.name,
        key: _public.experiment.key
      }).$promise.then(onSaveSuccess, onSaveError);
    };

    function onSaveSuccess(){
      routeService.go('app.projects', {
        projectId: getProjectId()
      });
    }

    function onSaveError(error){
      var errorKey = textService.toSnakeCase(error.data.key.toUpperCase());
      _public.alert = {
        type: 'error',
        message: EXPERIMENT.ERRORS[errorKey]
      };
    }

    function parseProjectName(projectName){
      projectName = projectName || '';
      return projectName.replace(/[^a-zA-Z0-9 ]/g,'');
    }

    function buildProjectKey(projectName){
      return textService.toSnakeCase(projectName.toLowerCase());
    }

    function getProjectId(){
      return routeService.getParams('projectId');
    }
  }

  app.component('experimentForm', {
    templateUrl: '/components/experiment-form/experiment-form-template.html',
    controller: [
      'EXPERIMENT',
      'routeService',
      'experimentsResource',
      'textService',
      experimentFormController
    ]
  });

}());
