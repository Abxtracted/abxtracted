define('components/codePanels', [
    'jquery',
    'components/code'
  ], function($, code){

    var MENU_ITEM_ATTR = 'data-code-panels-menu-item';
    var MENU_ITEM_SELECTOR = '[' + MENU_ITEM_ATTR + ']';
    var MENU_ITEM_SELECTED_CSS_CLASS = 'code-panels-menu-item-selected';
    var PANEL_ATTR = 'data-code-panel';
    var PANEL_SELECTOR = '[' + PANEL_ATTR + ']';
    var PANEL_VISIBLE_CSS_CLASS = 'code-panel-visible';

    var _public = {};

    _public.init = function(){
      bindMenuItemElements();
      selectFirstMenuItem();
      code.init();
    }

    function bindMenuItemElements(){
      $(MENU_ITEM_SELECTOR).on('click', onMenuItemClicked);
    }

    function onMenuItemClicked(evt){
      var panel = $(evt.currentTarget).attr(MENU_ITEM_ATTR);
      selectCodePanel(panel);
    }

    function selectFirstMenuItem(){
      var items = $(MENU_ITEM_SELECTOR);
      var panel = $(items[0]).attr(MENU_ITEM_ATTR);
      selectCodePanel(panel);
    }

    function selectCodePanel(panel){
      $(MENU_ITEM_SELECTOR).removeClass(MENU_ITEM_SELECTED_CSS_CLASS);
      $(PANEL_SELECTOR).removeClass(PANEL_VISIBLE_CSS_CLASS);
      $('[' + MENU_ITEM_ATTR + '=' + panel + ']').addClass(MENU_ITEM_SELECTED_CSS_CLASS);
      $('[' + PANEL_ATTR + '=' + panel + ']').addClass(PANEL_VISIBLE_CSS_CLASS);
    }

    return _public;

});
