'use strict';

/**
 * @ngdoc overview
 * @name productBrowingAppApp
 * @description
 * # productBrowingAppApp
 *
 * Main module of the application.
 */
angular.module('productBrowingAppApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/categories');
    $stateProvider
        .state('about', {
            templateUrl: 'about.html',
            url: '/about',
            controller: 'AboutCtrl'
        })
        .state('categories', {
            templateUrl: 'category.html',
            url: '/categories',
            controller: 'CategoryCtrl'
        })
        .state('books', {
            templateUrl: 'books.html',
            url: '/categories/:catID/books',
            controller: 'BooksCtrl'
        })
        .state('book', {
            templateUrl: 'books.html',
            url: '/categories/:catID/books/:bookID',
            controller: 'BooksCtrl'
        });
});