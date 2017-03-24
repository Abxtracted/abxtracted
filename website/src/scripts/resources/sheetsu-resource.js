define('resources/sheetsuResource', [
    'resources/baseResource'
  ], function(baseResource){

    var _public = {};

    _public.send = function(contact){
      return baseResource.post(environment.sheetsu.url, contact, {
        'Authorization': getAuthToken()
      });
    };

    function getAuthToken(){
      var auth = btoa(environment.sheetsu.key + ':' + environment.sheetsu.secret);
      return ['Basic ', auth].join('');
    }

    return _public;

});
