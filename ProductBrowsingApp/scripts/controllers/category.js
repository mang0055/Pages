'use strict';

/**
 * @ngdoc function
 * @name productBrowingAppApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the productBrowingAppApp
 */
angular.module('productBrowingAppApp')
  .controller('CategoryCtrl', function ($scope,$stateParams,fetchCategory) {
    fetchCategory.fetch().then(function(data) {
       $scope.data = data;
    });
    
  });
