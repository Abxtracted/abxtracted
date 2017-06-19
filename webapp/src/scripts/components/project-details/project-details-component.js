(function(){
  'use strict';

  function projectDetailsController($stateParams, projectsResource){
    var _public = this;

    var GET_PROJECT_ERROR_MESSAGE = 'Unable to get the project. Please, try again.';

    _public.$onInit = function(){
      getProject();
    };

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
      setAlert('error', GET_PROJECT_ERROR_MESSAGE);
    }

    function setAlert(type, message){
      _public.alert = {
        type: type,
        message: message
      };
    }
  }

  app.component('projectDetails', {
    templateUrl: '/components/project-details/project-details-template.html',
    controller: ['$stateParams', 'projectsResource', projectDetailsController]
  });

}());
