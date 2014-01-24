'use strict';

angular.module('angcmsApp')
  .controller('CategoryCtrl', ['$scope', 'angcmsFactory','$routeParams', 
        function ($scope, angcmsFactory , $routeParams) {
    $scope.collectionName="categories";

      if( angular.isDefined($routeParams.id) && $routeParams.id !== null ){
            $scope.catId = $routeParams.id;
          }

    $scope.getCurrentCategory = function () {
    angcmsFactory.getRecord($scope.collectionName, $scope.catId).success(function (category) {
      $scope.currentCategory = category;
    }).error(function (error) {
      $scope.status = 'Unable to get Category: ' + error.message;
    });
  };
  }]);
