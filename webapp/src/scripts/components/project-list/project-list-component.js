(function(){
  'use strict';

  function projectListController(TRACK, trackService, routeService,
    projectsResource){

    var _public = this;

    var GET_PROJECTS_ERROR_MESSAGE = 'Unable to get projects. Please, try again';

    _public.blankslateOptions = {
      imageCssClass: 'project-list-blankslate-image',
      caption: 'No projects.',
      action: onBlankslateLinkClick
    };

    _public.$onInit = function(){
      getProjects();
    };

    _public.onProjectNewBtnClick = function(){
      trackNewProjectBtnClicked();
      goToProjectsNew();
    };

    function onBlankslateLinkClick(){
      trackBlankslateLinkClicked();
      goToProjectsNew();
    }

    function goToProjectsNew(){
      routeService.go('app.projects-new');
    }

    function getProjects(){
      setLoaderVisibility(true);
      projectsResource.query().$promise
        .then(onGetProjectsSuccess, onGetProjectsError);
    }

    function onGetProjectsSuccess(projects){
      trackProjectListLoaded(projects);
      onGetProjectsComplete();
      setProjects(projects);
    }

    function trackProjectListLoaded(projects){
      if(projects && projects.length)
        trackService.track(TRACK.PROJECTS.LOADED_LIST, {
          numOfProjects: projects.length
        });
    }

    function setProjects(projects){
      _public.projects = projects;
    }

    function onGetProjectsError(){
      onGetProjectsComplete();
      setAlert('error', GET_PROJECTS_ERROR_MESSAGE);
    }

    function onGetProjectsComplete(){
      setLoaderVisibility(false);
    }

    function setLoaderVisibility(isVisible){
      _public.shouldShowLoader = isVisible;
    }

    function setAlert(type, message){
      _public.alert = {
        type: type,
        message: message
      };
    }

    function trackBlankslateLinkClicked(){
      trackService.track(TRACK.PROJECTS.BLANKSLATE_LINK_CLICKED);
    }

    function trackNewProjectBtnClicked(){
      trackService.track(TRACK.PROJECTS.NEW_PROJECT_BTN_CLICKED);
    }
  }

  app.component('projectList', {
    templateUrl: '/components/project-list/project-list-template.html',
    controller: [
      'TRACK',
      'trackService',
      'routeService',
      'projectsResource',
      projectListController
    ]
  });

}());
