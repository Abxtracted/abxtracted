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

      return _public;

  }]);

}());
