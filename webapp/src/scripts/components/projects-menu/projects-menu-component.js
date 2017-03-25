(function(){
  'use strict';

  function projectsMenuController(BROADCAST, $scope, routeService, projectsResource){
    var _public = this;

    _public.$onInit = function(){
      getAllProjects();
      setListeners();
    }

    _public.onMenuItemClick = function(projectId){
      routeService.go('app.projects', {
        projectId: projectId
      });
    }

    function getAllProjects(){
      projectsResource.query({})
        .$promise.then(onGetAllProjectsSuccess, onGetAllProjectsError);
    }

    function setListeners(){
      $scope.$on(BROADCAST.PROJECT.CREATED, getAllProjects);
      $scope.$on(BROADCAST.PROJECT.DESTROYED, onProjectDestroyed);
    }

    function onGetAllProjectsSuccess(projects) {
      _public.projects = projects || [];
    }

    function onGetAllProjectsError(error) {
      console.warn(error);
    }

    function onProjectDestroyed(evt, destroyedProject){
      _public.projects = _public.projects.filter(function(project){
        return destroyedProject.id !== project.id
      });
    }
  }

  app.component('projectsMenu', {
    templateUrl: '/components/projects-menu/projects-menu-template.html',
    controller: [
      'BROADCAST',
      '$scope',
      'routeService',
      'projectsResource',
      projectsMenuController
    ]
  });

}());
