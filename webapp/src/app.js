(function () {
  'use strict';

  window.app = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'templates'
  ]).config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default').dark();
  }]);



})(window);
