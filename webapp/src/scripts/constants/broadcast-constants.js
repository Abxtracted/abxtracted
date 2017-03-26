(function(){

  app.constant('BROADCAST', {
    PROJECT: {
      CREATED: 'projectCreated',
      DESTROYED: 'projectDestroyed'
    },
    EXPERIMENT: {
      LIST_LOADED: 'experimentListLoaded',
      DESTROYED: 'experimentDestroyed'
    }
  });

})();
