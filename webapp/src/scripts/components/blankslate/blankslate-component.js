(function(){
  'use strict';

  function blankslateController(){
    var _public = this;

    _public.$onInit = function(){
      configBlankslate();
    };

    _public.$onChanges = function(){
      configBlankslate();
    };

    _public.onLinkClicked = function(){
      var options = _public.options;
      if(options.action)
        options.action(options);
    };

    function configBlankslate(){
      if(!_public.collection || (_public.collection && _public.collection.length))
        _public.shouldShowBlankslate = false;
      else
        _public.shouldShowBlankslate = true;
    }
  }

  app.component('blankslate', {
    templateUrl: '/components/blankslate/blankslate-template.html',
    controller: blankslateController,
    bindings: {
      collection: '<',
      options: '<'
    }
  });

}());
