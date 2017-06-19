(function(){
  'use strict';

  function projectSummaryController(TRACK, BROADCAST, $scope, trackService,
    routeService, projectsResource){

    var REMOTION_CONFIRMATION_MESSAGE = 'Are you sure you want to remove ' +
                                        '"{projectName}"?';

    var _public = this;

    _public.numOfExperiments = 0;

    _public.$onInit = function(){
      trackProjectSummaryLoaded();
      setListeners();
    };

    _public.createExperiment = function(projectId){
      trackNewExperimentBtnClicked();
      routeService.go('app.experiments-new', {
        projectId: projectId
      });
    };

    _public.removeProject = function(project){
      var message = REMOTION_CONFIRMATION_MESSAGE
        .replace(/\{projectName\}/g, project.name);

      trackProjectRemoveBtnClicked();
      if(confirm(message))
        projectsResource.destroy({
          projectId: project.id
        }).$promise.then(function(){
          onRemoveProjectsSuccess(project);
        }, onRemoveProjectsError);
    };

    function onRemoveProjectsSuccess(project){
      trackProjectRemoved();
      routeService.go('app.projects');
    }

    function onRemoveProjectsError(error){
      trackProjectFailedToRemove(error);
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

    function trackProjectSummaryLoaded(){
      trackService.track(TRACK.PROJECTS.LOADED_SUMMARY, getProjectData());
    }

    function trackProjectRemoveBtnClicked(){
      trackService.track(TRACK.PROJECTS.REMOVE_BTN_CLICKED, getProjectData());
    }

    function trackProjectRemoved(){
      trackService.track(TRACK.PROJECTS.REMOVED, getProjectData());
    }

    function trackProjectFailedToRemove(error){
      trackService.track(TRACK.PROJECTS.FAILED_TO_REMOVE, {
        error: error,
        project: getProjectData()
      });
    }

    function trackNewExperimentBtnClicked(){
      trackService.track(TRACK.EXPERIMENTS.NEW_EXPERIMENT_BTN_CLICKED, getProjectData());
    }

    function getProjectData(){
      return {
        id: _public.project.id,
        name: _public.project.name
      };
    }
  }

  app.component('projectSummary', {
    templateUrl: '/components/project-summary/project-summary-template.html',
    controller: [
      'TRACK',
      'BROADCAST',
      '$scope',
      'trackService',
      'routeService',
      'projectsResource',
      projectSummaryController
    ],
    bindings: {
      project: '<'
    }
  });

}());
