define('components/topbar', [
    'jquery',
    'components/menuPrimary',
    'services/locationService'
  ], function($, menuPrimary, locationService){

    var TOPBAR_SELECTOR = '[data-js=topbar]';
    var TOPBAR_LOGO_SELECTOR = [TOPBAR_SELECTOR,'[data-js=logo]'].join(' ');

    var _public = {};

    _public.init = function(){
      bindElements();
      if(menuPrimary.isPresent())
        menuPrimary.init();
    }

    function bindElements(){
      $(TOPBAR_LOGO_SELECTOR).on('click', onTopbarLogoClick);
    }

    function onTopbarLogoClick(){
      locationService.goToWebisteHome();
    }

    _public.getHeight = function(){
      return $(TOPBAR_SELECTOR).outerHeight() || 0;
    }

    return _public;

});
