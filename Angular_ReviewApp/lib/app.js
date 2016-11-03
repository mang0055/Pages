var app = angular.module('reviewApp', ['pascalprecht.translate', 'LocalStorageModule', 'angularUtils.directives.dirPagination']);
app.config(function ($translateProvider,localStorageServiceProvider) {
    $translateProvider.translations('en', {
        'LANGUAGE': 'English',
        'NICKNAME':'Nickname',
        'REVIEW':'Review',
        'SUBMIT':'Submit',
        'TEXT_LEFT':'Left',
        'LANG_SELECTION_TEXT':'Selected Language is',
        'CREATED': 'Created',
        'SELECT_ORDER':'Select Order'
    });
    $translateProvider.translations('fr', {
        'LANGUAGE': 'français',
        'NICKNAME':'surnom',
        'REVIEW':'la revue',
        'SUBMIT':'Soumettre',
        'TEXT_LEFT':'gauche',
        'LANG_SELECTION_TEXT':'Langue sélectionnée est',
        'CREATED': 'créé',
        'SELECT_ORDER':'sélectionner la commande'
    });
    localStorageServiceProvider.setPrefix('ReviewRApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
});

 app.directive("productReview", function(){
      return {
        replace: true,
        restrict: 'E',
        templateUrl: 'product-review.html',
        scope: {
          review: '=review',
        },
      };
    });
