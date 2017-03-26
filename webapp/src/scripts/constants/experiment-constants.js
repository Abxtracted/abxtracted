(function(){

  app.constant('EXPERIMENT', {
    ERRORS: {
      HAS_BEEN_TAKEN: 'This experiment name has already been taken. Please, choose a different one.'
    },
    MARGIN_OF_ERROR: {
      INFINITY: 'Not enough data'
    },
    STATUS: {
      VALID: {
        TEXT: 'Significant',
        CSS_CLASS: 'experiment-status-valid'
      },
      INVALID: {
        TEXT: 'Not significant',
        CSS_CLASS: 'experiment-status-invalid'
      },
      TESTING: {
        TEXT: 'Collecting data',
        CSS_CLASS: 'experiment-status-testing'
      }
    }
  });

})();
