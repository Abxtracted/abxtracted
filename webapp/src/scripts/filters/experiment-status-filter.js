(function(){

  app.filter('experimentStatus', [
    'experimentService',
    function(experimentService){

      function filter(status){
        return experimentService.getStatus(status).TEXT;
      }

      return filter;

  }]);

}());

