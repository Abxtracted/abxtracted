define('components/pageHeader', [
    'jquery',
    'components/topbar',
    'services/locationService'
  ], function($, topbar, locationService){

    var PAGE_HEADER_SELECTOR = '[data-js=page-header]';
    var PAGE_HEADER_SIBLING_SECTION_SELECTOR = [PAGE_HEADER_SELECTOR,'section'].join('+');
    var PAGE_HEADER_PRIMARY_BUTTON_SELECTOR = '[data-js=page-header-primary-button]';
    var PAGE_HEADER_SECONDARY_BUTTON_SELECTOR = '[data-js=page-header-secondary-button]';

    var _public = {};

    _public.init = function(){
      bindElements();
    }

    function bindElements(){
      $(PAGE_HEADER_PRIMARY_BUTTON_SELECTOR).on('click', onPageHeaderPrimaryButtonClick)
      $(PAGE_HEADER_SECONDARY_BUTTON_SELECTOR).on('click', goToSiblingSection)
    }

    function onPageHeaderPrimaryButtonClick(){
      locationService.goToApp();
    }

    function goToSiblingSection(){
      var siblingSectionOffset = $(PAGE_HEADER_SIBLING_SECTION_SELECTOR).offset();
      $('html, body').animate({
        scrollTop: siblingSectionOffset.top - topbar.getHeight()
      }, 600, 'swing');
    }

    return _public;

});
