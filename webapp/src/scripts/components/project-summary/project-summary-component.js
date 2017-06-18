(function(){
  'use strict';

  function projectSummaryController(BROADCAST, $scope, routeService,
    projectsResource){

    var REMOTION_CONFIRMATION_MESSAGE = 'Are you sure you want to remove ' +
                                        '"{projectName}"?';

    var _public = this;

    _public.numOfExperiments = 0;

    _public.$onInit = function(){
      setListeners();
    };

    _public.createExperiment = function(projectId){
      routeService.go('app.experiments-new', {
        projectId: projectId
      });
    };

    _public.removeProject = function(project){
      var message = REMOTION_CONFIRMATION_MESSAGE
        .replace(/\{projectName\}/g, project.name);

      if(confirm(message))
        projectsResource.destroy({
          projectId: project.id
        }).$promise.then(function(){
          onRemoveProjectsSuccess(project);
        }, onRemoveProjectsError);
    };

    function onRemoveProjectsSuccess(project){
      routeService.go('app.projects');
    }

    function onRemoveProjectsError(error){
      console.warn(error);
    }

    function setListeners(){
      $scope.$on(BROADCAST.EXPERIMENT.LIST_LOADED, onExperimentListLoaded);
      $scope.$on(BROADCAST.EXPERIMENT.DESTROYED, onExperimentDestroyed);
    }

    function onExperimentListLoaded(evt, experiments){
      _public.numOfExperiments = experiments ? experiments.length : 0;
    }

    function onExperimentDestroyed(){
      _public.numOfExperiments -= 1;
    }
  }

  app.component('projectSummary', {
    templateUrl: '/components/project-summary/project-summary-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      'routeService',
      'projectsResource',
      projectSummaryController
    ],
    bindings: {
      project: '='
    }
  });

}());
