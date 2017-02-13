define('resources/sheetsu-resource', [
    'resources/base-resource'
  ], function(baseResource){

    var SHEETSU = {
      URL: 'https://sheetsu.com/apis/v1.0/f343f211c06b',
      KEY: 'mfNDqbyXCmqc1zANtrWX',
      SECRET: 'zVh3i4YghzEuP9CeDSk66BX1pqZiakbAyhHip2Bc'
    };

    var _public = {};

    _public.send = function(contact){
      return baseResource.post(SHEETSU.URL, contact, {
        'Authorization': getAuthToken()
      });
    };

    function getAuthToken(){
      return ['Basic ',btoa(SHEETSU.KEY+':'+SHEETSU.SECRET)].join('');
    }

    return _public;

});
