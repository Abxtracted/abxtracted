(function(){
  'use strict';

  function experimentListController(BROADCAST, $scope, $stateParams, experimentsResource, broadcastService){
    var _public = this;

    _public.$onInit = function(){
      getExperiments();
      setListeners();
    };

    function getExperiments(){
      experimentsResource.query({
        projectId: $stateParams.projectId
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

    function onExperimentDestroyed(evt, experiment){
      var experimentIndex = findExperimentIndex(experiment);
      _public.experiments.splice(experimentIndex, 1);
    }

    function findExperimentIndex(experiment){
      for (var i = 0; i < _public.experiments.length; i++)
        if(_public.experiments[i].id === experiment.id)
          return i;
    }
  }

  app.component('experimentList', {
    templateUrl: '/components/experiment-list/experiment-list-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      '$stateParams',
      'experimentsResource',
      'broadcastService',
      experimentListController
    ]
  });

}());
