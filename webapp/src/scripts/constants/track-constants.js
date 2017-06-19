(function(){

  'use strict';

  app.constant('TRACK', {
    LOGIN: {
      LOADED: 'loaded login',
      BTN_CLICKED: 'clicked on login button'
    },
    USER_MENU: {
      PROJETS_ITEM_CLICKED: 'clicked on user menu projects item',
      DOCS_ITEM_CLICKED: 'clicked on user menu docs item',
      LOGOUT_ITEM_CLICKED: 'clicked on user menu logout item'
    },
    PROJECTS: {
      LOADED_LIST: 'loaded project list',
      LOADED_FORM: 'loaded project form',
      CREATED: 'created project',
      FAILED_TO_CREATE: 'failed on creating project',
      CARD_CLICKED: 'clicked on project card',
      LOADED_SUMMARY: 'loaded project summary',
      REMOVE_BTN_CLICKED: 'clicked on project remove button',
      REMOVED: 'removed project',
      FAILED_TO_REMOVE: 'failed on removing project',
      NEW_PROJECT_BTN_CLICKED: 'clicked on new project button',
      BLANKSLATE_LINK_CLICKED: 'clicked on project blankslate link'
    },
    EXPERIMENTS: {
      LOADED_LIST: 'loaded experiment list',
      LOADED_FORM: 'loaded experiment form',
      CREATED: 'created experiment',
      FAILED_TO_CREATE: 'failed on creating experiment',
      LOADED_DETAILS: 'loaded experiment details',
      UNLOADED_DETAILS: 'unloaded experiment details',
      NEW_EXPERIMENT_BTN_CLICKED: 'clicked on new experiment button',
      BLANKSLATE_LINK_CLICKED: 'clicked on experiment blankslate link',
      REMOVE_BTN_CLICKED: 'clicked on experiment remove button',
      FAILED_TO_REMOVE: 'failed on removing project',
      REMOVED: 'removed experiment'
    },
    LOGOUT: 'logged out'
  });

}());
