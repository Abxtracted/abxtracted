define('components/menuPrimary', [
    'jquery',
    'services/locationService'
  ], function($, locationService){

    var MENU_PRIMARY_SELECTOR = '[data-js="menu-primary"]';
    var MENU_PRIMARY_ITEM_ATTR = 'data-menu-primary-item';

    var _public = {};

    _public.init = function(){
      bindElements();
    }

    _public.isPresent = function(){
      return $(MENU_PRIMARY_SELECTOR).length;
    }

    function bindElements(){
      $('[' + MENU_PRIMARY_ITEM_ATTR + ']').on('click', onMenuItemClick)
    }

    function onMenuItemClick(evt){
      var item = $(evt.currentTarget).attr(MENU_PRIMARY_ITEM_ATTR);
      if(item == 'login')
        locationService.goToApp();
      else
        locationService.path(item);
    }

    return _public;

});
