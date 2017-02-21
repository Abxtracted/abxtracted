(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentsResource, broadcastService){
    var _public = this;

    var SELECT_AS_WINNER_CONFIRM_MESSAGE =  'Are you sure you want select this ' +
                                            'version as winner? Clicking OK, ' +
                                            'only this version will be shown. ' +
                                            'This action cannot be undone.'

    _public.detailsButtonLabel = 'See details';

    _public.removeExperiment = function(experiment){
      if(confirm('Are you sure you want to delete "' + experiment.name + '"?'))
        experimentsResource.destroy({
          projectId: experiment.project.id,
          experimentId: experiment.id
        }, function(){
          onDestroyExperimentSuccess(experiment)
        }, onDestroyExperimentError);
    }

    _public.getConversionRate = function(sampleSize, converted){
      if(sampleSize)
        return ((converted / sampleSize) * 100).toFixed(2);
      return 0;
    }

    _public.selectAsWinner = function(scenario){
      if(confirm(SELECT_AS_WINNER_CONFIRM_MESSAGE))
        console.log(scenario.name + ' was selected as winner!');
      else
        console.log('no scenario selected as winner...');
    }

    function onDestroyExperimentSuccess(experiment){
      broadcastService.broadcast(BROADCAST.EXPERIMENT.DESTROYED, experiment);
    }

    function onDestroyExperimentError(error){
      console.log(error);
    }

    _public.getDetails = function(experiment){
      setDetailsButtonLabel('Loading...');

      experimentsResource.getDetails({
        projectId: experiment.project.id,
        experimentId: experiment.id
      }, onGetDetailsSuccess, onGetDetailsError);
    };

    function onGetDetailsSuccess(details){
      _public.experiment.details = details;
    }

    function onGetDetailsError(error){
      console.log(error);
      setDetailsButtonLabel('Ops, try again.');
    }

    function setDetailsButtonLabel(label){
      _public.detailsButtonLabel = label;
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
