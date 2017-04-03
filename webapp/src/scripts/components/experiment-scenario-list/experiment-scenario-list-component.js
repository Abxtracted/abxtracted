(function(){
  'use strict';

  function experimentScenarioListController(experimentService){
    var _public = this;

    _public.$onInit = function(){
      _public.isFailingExperiment = experimentService.isFailingExperiment(_public.experiment.details);
    };
  }

  app.component('experimentScenarioList', {
    templateUrl: '/components/experiment-scenario-list/experiment-scenario-list-template.html',
    controller: [
      'experimentService',
      experimentScenarioListController
    ],
    bindings: {
      experiment: '='
    }
  });

}());
