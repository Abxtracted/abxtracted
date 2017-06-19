(function(){
  'use strict';

  function experimentCardController(TRACK, BROADCAST, trackService,
    experimentService, experimentsResource, broadcastService){

    var _public = this;

    var REMOTION_CONFIRMATION_MESSAGE = 'Are you sure you want to remove ' +
                                        '"{experimentName}"?';

    _public.$onInit = function(){
      setDetailsButtonLabel();
    };

    _public.removeExperiment = function(experiment){
      var message = REMOTION_CONFIRMATION_MESSAGE
        .replace(/\{experimentName\}/g, experiment.name);

      trackExperimentRemoveBtnClicked(experiment);
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
      trackExperimentRemoved();
      broadcastService.publish(BROADCAST.EXPERIMENT.DESTROYED, experiment);
    }

    function onDestroyExperimentError(error){
      trackExperimentFailedToRemove(error);
    }

    function getDetails(experiment){
      setDetailsButtonLabel('Loading...');

      experimentsResource.getDetails({
        projectId: experiment.project.id,
        experimentId: experiment.id
      }).$promise.then(onGetDetailsSuccess, onGetDetailsError);
    }

    function onGetDetailsSuccess(details){
      trackExperimentDetailsLoaded(details);
      setExperimentDetails(details);
      setDetailsButtonLabel('Hide details');
      setExperimentResult(details);
    }

    function setExperimentDetails(details){
      _public.experiment.details = details;
    }

    function onGetDetailsError(error){
      setDetailsButtonLabel('Ops, try again.');
    }

    function setDetailsButtonLabel(label){
      label = label || 'See details';
      _public.detailsButtonLabel = label;
    }

    function destroyDetails(){
      trackExperimentDetailsUnloaded();
      setExperimentDetails(null);
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

    function trackExperimentRemoveBtnClicked(experiment){
      trackService.track(TRACK.EXPERIMENTS.REMOVE_BTN_CLICKED, getExperimentData());
    }

    function trackExperimentFailedToRemove(){
      trackService.track(TRACK.EXPERIMENTS.FAILED_TO_REMOVE, getExperimentData());
    }

    function trackExperimentRemoved(){
      trackService.track(TRACK.EXPERIMENTS.REMOVED, getExperimentData());
    }

    function trackExperimentDetailsLoaded(details){
      trackService.track(TRACK.EXPERIMENTS.LOADED_DETAILS, {
        experimentKey: getExperimentData().key,
        sampleSize: details.sampleSize,
        variationConversionRate: details.scenarios[0].rate,
        variationConverted: details.scenarios[0].converted,
        controlConversionRate: details.scenarios[1].rate,
        controlConverted: details.scenarios[1].converted,
        marginOfError: details.marginOfError,
        status: details.status
      });
    }

    function trackExperimentDetailsUnloaded(){
      trackService.track(TRACK.EXPERIMENTS.UNLOADED_DETAILS, getExperimentData());
    }

    function getExperimentData(){
      return {
        key: _public.experiment.key
      };
    }
  }

  app.component('experimentCard', {
    templateUrl: '/components/experiment-card/experiment-card-template.html',
    controller: [
      'TRACK',
      'BROADCAST',
      'trackService',
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
