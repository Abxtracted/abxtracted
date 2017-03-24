define('components/ctaBar', [
    'jquery',
    'services/locationService'
  ], function($, locationService){

    var _public = {};

    _public.init = function(){
      bindElements();
    }

    function bindElements(){
      $('[data-js="cta-bar-button"]').on('click', onCtaBarButtonClick)
    }

    function onCtaBarButtonClick(){
      locationService.goToApp();
    }

    return _public;

});
