(function(){
  'use strict';

  function experimentFormController(TRACK, EXPERIMENT, trackService,
    routeService, experimentsResource, textService){

    var _public = this;

    _public.$onInit = function(){
      trackExperimentFormLoaded();
    };

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

    function onSaveSuccess(experiment){
      trackExperimentCreated(experiment);
      routeService.go('app.projects-view', {
        projectId: getProjectId()
      });
    }

    function onSaveError(error){
      var errorKey = getErrorKey();

      trackExperimentFailedToCreate();
      _public.alert = {
        type: 'error',
        message: EXPERIMENT.ERRORS[errorKey]
      };
    }

    function getErrorKey(error){
      if(error && error.data && error.data.key)
        return textService.toSnakeCase(error.data.key.toUpperCase());
      return 'UNKNOWN';
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

    function trackExperimentFormLoaded(){
      trackService.track(TRACK.EXPERIMENTS.LOADED_FORM);
    }

    function trackExperimentCreated(experiment){
      trackService.track(TRACK.EXPERIMENTS.CREATED, getExperimentData());
    }

    function trackExperimentFailedToCreate(){
      trackService.track(TRACK.EXPERIMENTS.FAILED_TO_CREATE, getExperimentData());
    }

    function getExperimentData(){
      return {
        key: _public.experiment.key
      };
    }
  }

  app.component('experimentForm', {
    templateUrl: '/components/experiment-form/experiment-form-template.html',
    controller: [
      'TRACK',
      'EXPERIMENT',
      'trackService',
      'routeService',
      'experimentsResource',
      'textService',
      experimentFormController
    ]
  });

}());
