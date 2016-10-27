'use strict';

/**
 * @ngdoc service
 * @name productBrowingAppApp.fetchCategory
 * @description
 * # fetchCategory
 * Service in the productBrowingAppApp.
 */
angular.module('productBrowingAppApp')
  .service('fetchCategory', function ($q, $timeout, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var fetchCategory = {
        fetch: function(callback) {
            return $timeout(function() {
                return $http.get('data.json').then(function(response) {
                    return angular.fromJson(response.data);
                });
            }, 30);
        }
    };
    ;
    return fetchCategory;
  });
