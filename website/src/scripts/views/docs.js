define('views/docs', [
    'components/ctaBar',
    'components/pageHeader',
    'components/codePanels'
  ], function(ctaBar, pageHeader, codePanels){

    var _public = {};


    _public.init = function(){
      ctaBar.init();
      pageHeader.init();
      codePanels.init();
    };

    return _public;

});
