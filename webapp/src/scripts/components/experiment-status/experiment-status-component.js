(function(){
  'use strict';

  function experimentStatusController(experimentService){
    var _public = this;

    _public.$onInit = function(){
      setStatusCssClass();
    };

    function setStatusCssClass(){
      var status = _public.status;
      _public.statusCssClass = experimentService.getStatus(status).CSS_CLASS;
    }
  }

  app.component('experimentStatus', {
    templateUrl: '/components/experiment-status/experiment-status-template.html',
    controller: [
      'experimentService',
      experimentStatusController
    ],
    bindings: {
      status: '@'
    }
  });

}());
