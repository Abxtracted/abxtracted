(function(){

  app.service('broadcastService', [
    '$rootScope',
    function($rootScope){

      var _public = {};

      _public.broadcast = function(eventName, eventData){
        $rootScope.$broadcast(eventName, eventData);
      };

      return _public;

  }]);

}());
