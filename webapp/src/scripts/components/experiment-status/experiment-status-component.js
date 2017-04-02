(function(){
  'use strict';

  function experimentStatusController(experimentService){
    var _public = this;

    _public.$onInit = function(){
      setStatus(_public.experimentDetails);
    };

    function setStatus(details){
      var status = experimentService.getStatus(details);
      _public.status = {
        text: status.TEXT,
        cssClass: status.CSS_CLASS
      };
    }
  }

  app.component('experimentStatus', {
    templateUrl: '/components/experiment-status/experiment-status-template.html',
    controller: [
      'experimentService',
      experimentStatusController
    ],
    bindings: {
      experimentDetails: '<'
    }
  });

}());
