(function(){
  'use strict';

  function projectSummaryController(BROADCAST, $scope, $location, projectsResource){
    var _public = this;

    _public.numOfExperiments = 0;

    _public.createExperiment = function(projectId){
      $location.path('/projects/' + projectId + '/experiments/new');
    }

    _public.removeProject = function(project){
      if(confirm('Are you sure you want to remove "' + project.name + '"?'))
        projectsResource.destroy({
          projectId: project.id
        }, onRemoveProjectsSuccess, onRemoveProjectsError);
    }

    function onRemoveProjectsSuccess(){
      $location.path('');
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

    _public.$onInit = function(){
      setListeners();
    }
  }

  app.component('projectSummary', {
    templateUrl: '/components/project-summary/project-summary-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      '$location',
      'projectsResource',
      projectSummaryController
    ],
    bindings: {
      project: '='
    }
  });

}());
