'use strict';

/**
 * @ngdoc function
 * @name productBrowingAppApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the productBrowingAppApp
 */
angular.module('productBrowingAppApp')
    .controller('BooksCtrl', function ($scope, $stateParams, fetchCategory) {
        $scope.catID = $stateParams.catID;
        $scope.bookdata = [];
        fetchCategory.fetch().then(function (data) {
            for (var i = 0; i < data.books.length; i++) {
                if (data.books[i].cat_id == $scope.catID) {
                    $scope.bookdata.push(data.books[i]);
                }
                if (data.books[i]._id == $stateParams.bookID) {
                    $scope.currentbook=data.books[i];
                }
            }

        });
    $scope.isEmpty = function(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
};
    });