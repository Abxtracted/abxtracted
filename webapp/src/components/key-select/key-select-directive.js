(function(app){
 'use strict';

  function keySelect(){

    function keySelectLink(scope, element){
      scope.copy = function(){
        var code = element.find('code')[0];
        var range = document.createRange();
        range.selectNodeContents(code);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
      }
    }

    return {
      restrict: 'E',
      templateUrl: '/components/key-select/key-select-template.html',
      replace: true,
      link: keySelectLink
    };
  }

  app.directive('keySelect', keySelect);
})(window.app);
