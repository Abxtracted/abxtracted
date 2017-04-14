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
        TEXT: 'Completed',
        CSS_CLASS: 'experiment-status-completed'
      },
      INVALID: {
        TEXT: 'Completed',
        CSS_CLASS: 'experiment-status-completed'
      },
      TESTING: {
        TEXT: 'Collecting data',
        CSS_CLASS: 'experiment-status-testing'
      },
      AWAITING: {
        TEXT: 'Awaiting data',
        CSS_CLASS: 'experiment-status-awaiting'
      }
    }
  });

})();
