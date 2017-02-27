define('services/contact-service', [
    'resources/sheetsu-resource'
  ], function(sheetsuResource){

  var _public = {};

  _public.send = function(contact){
    return sheetsuResource.send(contact);
  };

  return _public;

});
