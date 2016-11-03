angular.module("reviewApp")
    .controller("homeController", ['$scope', '$translate', 'localStorageService', function ($scope, $translate, localStorageService) {
        $scope.changeLanguage = function (key) {
            $translate.use(key);
            localStorageService.set('Switch_Lang', key);
        };
        if (localStorageService.isSupported) {
            console.log("Localstorage setup done");
            if (localStorageService.get('Switch_Lang') == 'fr') {
                $translate.use('fr');
            } else if (localStorageService.get('Switch_Lang') == 'en') {
                $translate.use('en');
            } else {
                $translate.use('en');
            }
        }
}])

.controller("formController", ['$scope', 'localStorageService', function ($scope, localStorageService) {
    $scope.checked=false;
    $scope.totalLimit=0;
    $scope.reviews = [],
        $scope.currentPage = 1, $scope.numPerPage = 2, $scope.maxSize = 15;
    $scope.isReverse = false;
    $scope.createReview = function (name, review) {
        var eachReview = {
            "name": name,
            "date": new Date(),
            "review": review
        };
        return eachReview;
    };


    if (!angular.isUndefined(localStorageService.get('reviews')) && localStorageService.get('reviews') != null) {
        $scope.reviews = localStorageService.get('reviews');
        $scope.totalLimit=$scope.reviews.length;
    }

    $scope.submit = function () {
        if ((!angular.isUndefined($scope.name) && $scope.name != null) && (!angular.isUndefined($scope.review) && $scope.review != null)) {
            $scope.totalLimit=$scope.reviews.length;
            if($scope.totalLimit>10){
                alert("Storage limit is 10 only. Please delete old one.");
            return;
            }
            var singleReview = $scope.createReview($scope.name, $scope.review);

            if (angular.isUndefined(localStorageService.get('reviews')) || localStorageService.get('reviews') === null) {
                console.log(singleReview);
                $scope.reviews.push(singleReview);
                if ($scope.reviews.length > 0)
                    localStorageService.set('reviews', $scope.reviews);
            } else {
                console.log('not null');
                $scope.reviews = localStorageService.get('reviews');
                $scope.reviews.push(singleReview);
                if ($scope.reviews.length > 0)
                    localStorageService.set('reviews', $scope.reviews);
            }
            $scope.checked=true;
            console.log($scope.reviews);
        } else {
            return;
        }

    };
    
    	$scope.sort = function (sortorder) {
		if (sortorder == 'asc') {
			$scope.isReverse = false;
		} else {
			$scope.isReverse = true;
		}
	}
}]);