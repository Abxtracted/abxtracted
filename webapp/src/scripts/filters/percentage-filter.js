(function(){

  app.filter('percentage', function(){

    function filter(value){
      if(typeof value == 'number')
        return (value * 100).toFixed(2);
      return 0;
    }

    return filter;

  });

}());

