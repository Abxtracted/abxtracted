(function(){
  'use strict';

  function projectsMenuController($location){
    var _public = this;

    _public.onMenuItemClick = function(projectId){
      $location.path('/projects/' + projectId);
    }

    _public.projects = [
      {
        name: 'Teleflik',
        id: 123
      }
    ];
  }

  app.component('projectsMenu', {
    templateUrl: '/components/projects-menu/projects-menu-template.html',
    controller: ['$location', projectsMenuController]
  });

}());
