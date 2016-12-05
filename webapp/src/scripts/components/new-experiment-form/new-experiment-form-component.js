(function(){
  'use strict';

  function newExperimentFormController(experimentsResource){
    var _public = this;

    _public.save = function(){
      experimentsResource.save({
        name: _public.experiment.name
      });
    }
  }

  app.component('newExperimentForm', {
    templateUrl: '/components/new-experiment-form/new-experiment-form-template.html',
    controller: ['experimentsResource', newExperimentFormController]
  });

}());
