(function(){
  'use strict';

  function experimentScenarioController(experimentService, experimentsResource){
    var _public = this;

    var SELECT_AS_WINNER_CONFIRM_MESSAGE =  'Are you sure you want select this ' +
                                            'scenario as winner? Clicking OK, ' +
                                            'only this scenario will be shown ' +
                                            'from now on. This action cannot ' +
                                            'be undone.';

    _public.$onInit = function(){
      setScenarioCssClasses();
    };

    _public.selectAsWinner = function(scenario){
      if(confirm(SELECT_AS_WINNER_CONFIRM_MESSAGE))
        experimentsResource.conclude({
          projectId: _public.experiment.project.id,
          experimentId: _public.experiment.id
        }, scenario ).$promise.then(onSelectAsWinnerSuccess, onSelectAsWinnerError);
    };

    function onSelectAsWinnerSuccess(response){
      console.log(response);
    }

    function onSelectAsWinnerError(error){
      console.log(error);
    }

    function setScenarioCssClasses(){
      var cssClasses =  [getScenarioNameCssClass(), getScenarioWinnerCssClass()]
                          .join(' ');
      _public.cssClasses = cssClasses;
    }

    function getScenarioNameCssClass(){
      var name = _public.scenario.name.toLowerCase();
      return ['experiment-scenario', name].join('-');
    }

    function getScenarioWinnerCssClass(){
      var details = _public.experiment.details;
      var scenario = _public.scenario;
      if(experimentService.isWinnerScenario(details, scenario))
        return 'experiment-scenario-winner';
      if(experimentService.isLoserScenario(details, scenario))
        return 'experiment-scenario-loser';
      return '';
    }
  }

  app.component('experimentScenario', {
    templateUrl: '/components/experiment-scenario/experiment-scenario-template.html',
    controller: [
      'experimentService',
      'experimentsResource',
      experimentScenarioController
    ],
    bindings: {
      scenario: '<',
      experiment: '<'
    }
  });

}());
