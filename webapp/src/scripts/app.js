(function () {
  'use strict';

  window.app = angular.module('app', [
    'ngResource',
    'ngCookies',
    'ui.router',
    'ngMaterial',
    'templates'
  ]).config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default').dark();
  }]);



})(window);
