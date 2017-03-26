(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentsResource, broadcastService){
    var _public = this;

    var REMOTION_CONFIRMATION_MESSAGE = 'Are you sure you want to remove ' +
                                        '"{experimentName}"?';

    var SELECT_AS_WINNER_CONFIRM_MESSAGE =  'Are you sure you want select this ' +
                                            'scenario as winner? Clicking OK, ' +
                                            'only this scenario will be shown ' +
                                            'from now on. This action cannot ' +
                                            'be undone.';

    _public.$onInit = function(){
      setDetailsButtonLabel();
    };

    _public.removeExperiment = function(experiment){
      var message = REMOTION_CONFIRMATION_MESSAGE
        .replace(/\{experimentName\}/g, experiment.name);

      if(confirm(message))
        experimentsResource.destroy({
          projectId: experiment.project.id,
          experimentId: experiment.id
        }).$promise.then(function(){
          onDestroyExperimentSuccess(experiment);
        }, onDestroyExperimentError);
    };

    _public.toggleDetails = function(experiment){
      if(_public.experiment.details)
        destroyDetails();
      else
        getDetails(experiment);
    };

    _public.getConversionRate = function(sampleSize, converted){
      if(sampleSize)
        return ((converted / sampleSize) * 100).toFixed(2);
      return 0;
    };

    _public.selectAsWinner = function(scenario){
      if(confirm(SELECT_AS_WINNER_CONFIRM_MESSAGE))
        experimentsResource.conclude({
          projectId: _public.experiment.project.id,
          experimentId: _public.experiment.id,
          result: scenario
        }).$promise.then(onSelectAsWinnerSuccess, onSelectAsWinnerError);
    };

    function onSelectAsWinnerSuccess(response){
      console.log(response);
    }

    function onSelectAsWinnerError(error){
      console.log(error);
    }

    function onDestroyExperimentSuccess(experiment){
      broadcastService.publish(BROADCAST.EXPERIMENT.DESTROYED, experiment);
    }

    function onDestroyExperimentError(error){
      console.log(error);
    }

    function getDetails(experiment){
      setDetailsButtonLabel('Loading...');

      experimentsResource.getDetails({
        projectId: experiment.project.id,
        experimentId: experiment.id
      }).$promise.then(onGetDetailsSuccess, onGetDetailsError);
    }

    function onGetDetailsSuccess(details){
      _public.experiment.details = details;
      setDetailsButtonLabel('Hide details');
    }

    function onGetDetailsError(error){
      console.log(error);
      setDetailsButtonLabel('Ops, try again.');
    }

    function setDetailsButtonLabel(label){
      label = label || 'See details';
      _public.detailsButtonLabel = label;
    }

    function destroyDetails(){
      delete _public.experiment.details;
      setDetailsButtonLabel();
    }
  }

  app.component('experimentCard', {
    templateUrl: '/components/experiment-card/experiment-card-template.html',
    controller: [
      'BROADCAST',
      'experimentsResource',
      'broadcastService',
      experimentCardController
    ],
    bindings: {
      experiment: '='
    }
  });

}());
