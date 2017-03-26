(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentsResource, broadcastService){
    var _public = this;

    _public.$onInit = function(){
      setDetailsButtonLabel();
    };

    _public.toggleDetails = function(experiment){
      if(_public.experiment.details)
        destroyDetails();
      else
        getDetails(experiment);
    };

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

    _public.removeExperiment = function(experiment){
      if(confirm('Are you sure you want to delete "' + experiment.name + '"?'))
        experimentsResource.destroy({
          projectId: experiment.project.id,
          experimentId: experiment.id
        }, function(){
          onDestroyExperimentSuccess(experiment);
        }, onDestroyExperimentError);
    };

    function onDestroyExperimentSuccess(experiment){
      broadcastService.publish(BROADCAST.EXPERIMENT.DESTROYED, experiment);
    }

    function onDestroyExperimentError(error){
      console.log(error);
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
