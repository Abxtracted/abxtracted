(function(){
  'use strict';

  function projectSummaryController($location, projectsResource){
    var _public = this;

    _public.createExperiment = function(projectId){
      $location.path('/projects/' + projectId + '/experiments/new');
    }

    _public.removeProject = function(project){
      if(confirm('Are you sure you want to remove "' + project.name + '"?'))
        projectsResource.destroy({
          projectId: project.id
        }, onRemoveProjectsSuccess, onRemoveProjectsError);
    }

    function onRemoveProjectsSuccess(){
      $location.path('');
    }

    function onRemoveProjectsError(error){
      console.warn(error);
    }
  }

  app.component('projectSummary', {
    templateUrl: '/components/project-summary/project-summary-template.html',
    controller: [
      '$location',
      'projectsResource',
      projectSummaryController
    ],
    bindings: {
      project: '='
    }
  });

}());
