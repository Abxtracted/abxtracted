(function(){

  app.filter('marginOfError', [
    'EXPERIMENT',
    function(EXPERIMENT){

      function filter(marginOfError){
        if(typeof marginOfError == 'string'){
          var KEY = marginOfError.toUpperCase();
          return EXPERIMENT.MARGIN_OF_ERROR[KEY].TEXT;
        }
        return marginOfError;
      }

      return filter;

  }]);

}());

