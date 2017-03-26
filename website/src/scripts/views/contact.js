define('views/contact', [
    'components/ctaBar',
    'components/pageHeader',
    'components/contactForm'
  ], function(ctaBar, pageHeader, contactForm){

    var _public = {};


    _public.init = function(){
      ctaBar.init();
      pageHeader.init();
      contactForm.init();
    };

    return _public;

});
