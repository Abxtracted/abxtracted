(function(){
  'use strict';

  function projectListController(projectsResource){
    var _public = this;

    var GET_PROJECTS_ERROR_MESSAGE = 'Unable to get projects. Please, try again';

    _public.$onInit = function(){
      getProjects();
    };

    function getProjects(){
      setLoaderVisibility(true);
      projectsResource.query().$promise
        .then(onGetProjectsSuccess, onGetProjectsError);
    }

    function onGetProjectsSuccess(projects){
      onGetProjectsComplete();
      setProjects(projects);
    }

    function setProjects(projects){
      _public.projects = projects;
    }

    function onGetProjectsError(){
      setAlert('error', GET_PROJECTS_ERROR_MESSAGE, getProjects);
    }

    function onGetProjectsComplete(){
      setLoaderVisibility(false);
    }

    function setLoaderVisibility(isVisible){
      _public.shouldShowLoader = isVisible;
    }

    function setAlert(type, message, retryAction){
      _public.alert = {
        type: type,
        message: message,
        retryAction: retryAction
      };
    }

  }

  app.component('projectList', {
    templateUrl: '/components/project-list/project-list-template.html',
    controller: [
      'projectsResource',
      projectListController
    ]
  });

}());
