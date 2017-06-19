(function(){
  'use strict';

  function experimentListController(TRACK, BROADCAST, $scope, trackService,
    routeService, experimentsResource, broadcastService){

    var GET_EXPERIMENTS_ERROR = 'Unable to get experiments. Please, try again.';

    var _public = this;

    _public.blankslateOptions = {
      imageCssClass: 'experiment-list-blankslate-image',
      caption: 'No experiments.',
      action: onExperimentBlankslateLinkClick
    };

    _public.$onInit = function(){
      getExperiments();
      setListeners();
    };

    function getExperiments(){
      setLoadervisibility(true);
      experimentsResource.query({
        projectId: _public.project.id
      }).$promise.then(onGetExperimentsSuccess, onGetExperimentsError);
    }

    function onGetExperimentsSuccess(experiments){
      onGetExperimentsComplete();
      trackExperimentListLoaded(experiments);
      setExperiments(experiments);
      broadcastListLoaded(experiments);
    }

    function onGetExperimentsError(error){
      onGetExperimentsComplete();
      setAlert('error', GET_EXPERIMENTS_ERROR);
    }

    function onGetExperimentsComplete(){
      setLoadervisibility(false);
    }

    function setExperiments(experiments){
      _public.experiments = experiments;
    }

    function trackExperimentListLoaded(experiments){
      if(experiments && experiments.length)
        trackService.track(TRACK.EXPERIMENTS.LOADED_LIST, {
          numOfExperiments: experiments.length
        });
    }

    function broadcastListLoaded(experiments){
      broadcastService.publish(BROADCAST.EXPERIMENT.LIST_LOADED, experiments);
    }

    function setListeners(){
      $scope.$on(BROADCAST.EXPERIMENT.DESTROYED, onExperimentDestroyed);
    }

    function onExperimentDestroyed(evt, destroyedExperiment){
      _public.experiments = _public.experiments.filter(function(experiment){
        return destroyedExperiment.id !== experiment.id;
      });
    }

    function setLoadervisibility(isVisible){
      _public.shouldShowLoader= isVisible;
    }

    function setAlert(type, message){
      _public.alert = {
        type: type,
        message: message
      };
    }

    function onExperimentBlankslateLinkClick(){
      trackExperimentBlankslateLinkClicked();
      goToExperimentsNew();
    }

    function goToExperimentsNew(){
      routeService.go('app.experiments-new', {
        projectId: _public.project.id
      });
    }

    function trackExperimentBlankslateLinkClicked(){
      trackService.track(TRACK.EXPERIMENTS.BLANKSLATE_LINK_CLICKED, {
        id: _public.project.id,
        name: _public.project.name
      });
    }
  }

  app.component('experimentList', {
    templateUrl: '/components/experiment-list/experiment-list-template.html',
    controller: [
      'TRACK',
      'BROADCAST',
      '$scope',
      'trackService',
      'routeService',
      'experimentsResource',
      'broadcastService',
      experimentListController
    ],
    bindings: {
      project: '<'
    }
  });

}());
