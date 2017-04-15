define('services/codeHighlightService', [
    'jquery',
    'highlightjs'
  ], function(highlightjs){

  var _public = {};

  _public.init = function(){
    var codeSamples = getCodeSamples();
    highlightCodeSamples(codeSamples);
  };

  function getCodeSamples(){
    return $('[data-js=code]');
  }

  function highlightCodeSamples(samples){
    samples.each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  return _public;

});
