(function(){
  'use strict';

  function experimentListController(BROADCAST, $scope, experimentsResource, broadcastService){
    var _public = this;

    _public.$onInit = function(){
      getExperiments();
      setListeners();
    };

    function getExperiments(){
      experimentsResource.query({
        projectId: _public.project.id
      }).$promise.then(onGetExperimentsSuccess, onGetExperimentsError);
    }

    function onGetExperimentsSuccess(experiments){
      _public.experiments = experiments;
      broadcastService.publish(BROADCAST.EXPERIMENT.LIST_LOADED, experiments);
    }

    function onGetExperimentsError(error){
      console.log(error);
    }

    function setListeners(){
      $scope.$on(BROADCAST.EXPERIMENT.DESTROYED, onExperimentDestroyed);
    }

    function onExperimentDestroyed(evt, destroyedExperiment){
      _public.experiments = _public.experiments.filter(function(experiment){
        return destroyedExperiment.id !== experiment.id;
      });
    }
  }

  app.component('experimentList', {
    templateUrl: '/components/experiment-list/experiment-list-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      'experimentsResource',
      'broadcastService',
      experimentListController
    ],
    bindings: {
      project: '<'
    }
  });

}());
