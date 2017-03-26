(function(){

  app.service('textService', function(){

    var _public = {};

    _public.toSnakeCase = function(text){
      return text.replace(/ /g,'_');
    };

    return _public;

  });

}());
