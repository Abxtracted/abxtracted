(function(){

  app.factory('projectsResource', [
    '$resource',
    'API',
    function($resource, API) {

      var BASE_URL = API.BASE_URL + 'projects';

      return $resource(BASE_URL, {}, {});

  }]);

}());
