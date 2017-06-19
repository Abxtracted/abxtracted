(function(){

  app.service('trackService', ['$window', function($window){

    var _public = {};

    _public.track = function(trackName, trackData){
      if($window.mixpanel)
        mixpanel.track(trackName, trackData);
    };

    return _public;

  }]);

}());
