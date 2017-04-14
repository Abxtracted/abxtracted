(function(){

  app.filter('experimentMarginOfError', [
    'EXPERIMENT',
    '$filter',
    function(EXPERIMENT, $filter){

      var percentageFilter = $filter('percentage');

      function filter(marginOfError){
        if(typeof marginOfError == 'string'){
          var key = marginOfError.toUpperCase();
          return EXPERIMENT.MARGIN_OF_ERROR[key];
        }
        return percentageFilter(marginOfError) + '%';
      }

      return filter;

  }]);

}());
