'use strict';

angular.module('angcmsApp')
  .controller('BlogCtrl', ['$scope', 'angcmsFactory','$routeParams', 
        function ($scope, angcmsFactory , $routeParams) {
    $scope.collectionName="blogs";

      if( angular.isDefined($routeParams.id) && $routeParams.id !== null ){
            $scope.blogId = $routeParams.id;
          }

    $scope.getCurrentBlog = function () {
    angcmsFactory.getRecord($scope.collectionName, $scope.blogId).success(function (blog) {
      $scope.currentBlog = blog;
    }).error(function (error) {
      $scope.status = 'Unable to get Blog: ' + error.message;
    });
  };
  }]);