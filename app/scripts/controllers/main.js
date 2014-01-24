'use strict';

angular.module('angcmsApp').controller('MainCtrl', function ($scope, $location, $cookieStore, $rootScope) {
  $scope.loginUser = $cookieStore.get("username");
  $scope.menu = [{
    url: '#/admin',
    title: 'Admin',
    current: $location.path() === 'admin'
  }, {
    url: '#/admin/blog',
    title: 'Blogs',
    current: $location.path() === 'admin/blog'
  }, {
    url: '#/admin/category',
    title: 'Categories',
    current: $location.path() === 'admin/category'
  }, {
    url: '#/admin/user',
    title: 'Users',
    current: $location.path() === 'admin/user'
  }];

  $scope.logOut = function () {
    $rootScope.loggedUser = false;
    $cookieStore.remove("username");
    $cookieStore.remove("password");
    $location.path("/admin/login");
  };
});