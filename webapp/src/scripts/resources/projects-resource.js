(function(){

  app.factory('projectsResource', [
    '$resource',
    'API',
    function($resource, API) {

      var BASE_URL = API.BASE_URL + 'projects';

      return $resource(BASE_URL, {}, {
        find : {
          url: BASE_URL + '/:projectId',
          method: 'GET',
          params: {
            projectId: '@projectId'
          }
        },
        destroy: {
          url: BASE_URL + '/:projectId',
          method: 'DELETE',
          params: {
            projectId: '@projectId'
          }
        }
      });

  }]);

}());
