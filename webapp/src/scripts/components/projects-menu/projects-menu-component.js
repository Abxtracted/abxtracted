(function(){
  'use strict';

  function projectsMenuController($scope, $location, projectsResource){
    var _public = this;

    _public.projects;

    _public.onMenuItemClick = function(projectId){
      $location.path('/projects/' + projectId);
    }

    function getAllProjects(){
      projectsResource.query({}, onGetAllProjectsSuccess, onGetAllProjectsError);
    }

    function onGetAllProjectsSuccess(projects) {
      _public.projects = projects || [];
    }

    function onGetAllProjectsError(error) {
      console.warn(error);
    }

    _public.$onInit = function(){
      getAllProjects();
    }
  }

  app.component('projectsMenu', {
    templateUrl: '/components/projects-menu/projects-menu-template.html',
    controller: [
      '$scope',
      '$location',
      'projectsResource',
      projectsMenuController
    ]
  });

}());
