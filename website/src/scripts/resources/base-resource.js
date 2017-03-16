define('resources/baseResource', ['jquery'], function($){

  var _public = {};

  _public.query = function(url, data, headers){
    return request('get', url, null, data, headers);
  };

  _public.get = function(url, id, data, headers){
    return request('get', url, id, data, headers);
  };

  _public.post = function(url, data, headers){
    return request('post', url, null, data, headers);
  };

  _public.update = function(url, id, data, headers){
    return request('put', url, id, data, headers);
  };

  _public.destroy = function(url, id, headers){
    return request('delete', url, id, null, headers);
  };

  function request(method, url, id, data, headers){
    var promise = $.Deferred();
    var request = buildRequest(method, url, id, data, headers, promise)
    $.ajax(request);
    return promise;
  }

  function buildRequest(method, url, id, data, headers, promise){
    return {
      type: method,
      url: buildRequestUrl(url, id),
      data: data ? data : null,
      headers : headers ? headers : null,
      success: function(response){
        promise.resolve(response);
      },
      error: function(error){
        promise.reject(error);
      }
    };
  }

  function buildRequestUrl(url, id){
    return id ? [url,id].join('/') : url;
  }

  return _public;

});
