(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentService,
    experimentsResource, broadcastService){

    var _public = this;

    var REMOTION_CONFIRMATION_MESSAGE = 'Are you sure you want to remove ' +
                                        '"{experimentName}"?';

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
      setExperimentResult(details);
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

    function setExperimentResult(details){
      _public.shouldShowSuccessfulResultMessage = shouldShownResultMessage('successful', details);
      _public.shouldShowFailingResultMessage = shouldShownResultMessage('failing', details);
    }

    function shouldShownResultMessage(resultType, details){
      if(_public.experiment.result)
        return false;
      if(resultType == 'successful')
        return experimentService.isSuccessfulExperiment(details);
      return experimentService.isFailingExperiment(details);
    }
  }

  app.component('experimentCard', {
    templateUrl: '/components/experiment-card/experiment-card-template.html',
    controller: [
      'BROADCAST',
      'experimentService',
      'experimentsResource',
      'broadcastService',
      experimentCardController
    ],
    bindings: {
      experiment: '='
    }
  });

}());
