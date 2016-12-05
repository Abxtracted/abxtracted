(function(){

  app.factory('experimentsResource', [
    '$resource',
    'API',
    function($resource, API) {

      var BASE_URL = API.BASE_URL + 'experiment';

      return $resource(BASE_URL, {}, {});

  }]);

}());
