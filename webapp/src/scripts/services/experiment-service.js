(function(){

  app.service('experimentService', [
    'EXPERIMENT',
    function(EXPERIMENT){

      var _public = {};

      _public.getStatus = function(experimentDetails){
        var status = experimentDetails.status.toUpperCase();
        if(!experimentDetails.sampleSize)
          return EXPERIMENT.STATUS.AWAITING;
        return EXPERIMENT.STATUS[status];
      };

      _public.isFailingExperiment = function(experimentDetails){
        return experimentDetails.status == 'invalid';
      };

      _public.isSuccessfulExperiment = function(experimentDetails){
        return experimentDetails.status == 'valid';
      };

      _public.isWinnerScenario = function(experimentDetails, scenario){
        var winner = getWinnerScenario(experimentDetails);
        if(winner)
          return winner.id === scenario.id;
      };

      _public.isLoserScenario = function(experimentDetails, scenario){
        var winner = getWinnerScenario(experimentDetails);
        if(winner)
          return winner.id !== scenario.id;
      };

      function getWinnerScenario(experimentDetails){
        if(_public.isSuccessfulExperiment(experimentDetails))
          return getBetterConversionVersion(experimentDetails.scenarios);
      }

      function getBetterConversionVersion(scenarios){
        if(scenarios[0].converted > scenarios[1].converted)
          return scenarios[0];
        return scenarios[1];
      }

      return _public;

  }]);

}());
