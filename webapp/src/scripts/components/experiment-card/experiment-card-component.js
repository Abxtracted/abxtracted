(function(){
  'use strict';

  function experimentCardController(BROADCAST, experimentsResource, broadcastService){
    var _public = this;

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
      broadcastService.broadcast(BROADCAST.EXPERIMENT.DESTROYED, experiment);
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
