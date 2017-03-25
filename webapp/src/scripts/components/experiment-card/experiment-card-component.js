(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentsResource, broadcastService){
    var _public = this;

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

    function onDestroyExperimentSuccess(experiment){
      broadcastService.publish(BROADCAST.EXPERIMENT.DESTROYED, experiment);
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
