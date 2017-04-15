define('components/code', [
    'services/codeHighlightService',
  ], function(codeHighlightService){

    var _public = {};

    _public.init = function(){
      codeHighlightService.init();
    }

    return _public;

});
