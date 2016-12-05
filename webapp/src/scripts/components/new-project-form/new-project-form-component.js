(function(){
  'use strict';

  function newProjectFormController(projectsResource){
    var _public = this;

    _public.save = function(){
      projectsResource.save({
        name: _public.project.name
      });
    }
  }

  app.component('newProjectForm', {
    templateUrl: '/components/new-project-form/new-project-form-template.html',
    controller: ['projectsResource', newProjectFormController]
  });

}());
