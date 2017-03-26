(function(){

  app.service('experimentService', [
    'EXPERIMENT',
    function(EXPERIMENT){

      var _public = {};

      _public.getStatus = function(status){
        status = status.toUpperCase();
        return EXPERIMENT.STATUS[status];
      };

      return _public;

  }]);

}());
