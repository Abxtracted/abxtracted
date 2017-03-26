define('views/pricing', [
    'components/ctaBar',
    'components/pageHeader'
  ], function(ctaBar, pageHeader){

    var _public = {};


    _public.init = function(){
      ctaBar.init();
      pageHeader.init();
    };

    return _public;

});
