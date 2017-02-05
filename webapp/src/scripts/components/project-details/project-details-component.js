(function(){
  'use strict';

  function projectDetailsController($stateParams, projectsResource){
    var _public = this;

    _public.project = null;

    function getProject(){
      var projectId = $stateParams.projectId;
      projectsResource.find({
        projectId: projectId
      }, onGetProjectSuccess, onGetProjectError);
    }

    function onGetProjectSuccess(project){
      _public.project = project;
      _public.project.numOfexperiments = getNumOfExperiments(project);
    }

    function getNumOfExperiments(project){
      return project.experiments ? project.experiments.length : 0;
    }

    function onGetProjectError(error){
      console.log(error);
    }

    _public.$onInit = function(){
      getProject();
    };
  }

  app.component('projectDetails', {
    templateUrl: '/components/project-details/project-details-template.html',
    controller: ['$stateParams', 'projectsResource', projectDetailsController]
  });

}());
