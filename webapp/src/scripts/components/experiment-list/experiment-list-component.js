(function(){
  'use strict';

  function experimentListController(BROADCAST, $scope, $stateParams, experimentsResource){
    var _public = this;

    _public.experiments;

    function getExperiments(){
      experimentsResource.query({
        projectId: $stateParams.projectId
      }, onGetExperimentsSuccess, onGetExperimentsError)
    }

    function onGetExperimentsSuccess(experiments){
      _public.experiments = experiments;
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

    _public.$onInit = function(){
      getExperiments();
      setListeners();
    }
  }

  app.component('experimentList', {
    templateUrl: '/components/experiment-list/experiment-list-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      '$stateParams',
      'experimentsResource',
      experimentListController
    ]
  });

}());
