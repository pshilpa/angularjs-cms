

'use strict';

angular.module('angcmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]).config( ['$routeProvider', function($routeProvider) { $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/category:title', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/admin/category', {
        templateUrl: 'views/admin/category.html',
        controller: 'AdminCategoryCtrl'
      })
      .when('/admin/category/edit/:id', {
        templateUrl: 'views/admin/category/edit.html',
        controller: 'AdminCategoryEditCtrl'
      })
      .when('/category/:title/:id', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/admin/login', {
        templateUrl: 'views/admin/includes/login.html',
        controller: 'AdminUserCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/user', {
        templateUrl: 'views/admin/user.html',
        controller: 'AdminUserCtrl'
      })
      .when('/admin/blog', {
        templateUrl: 'views/admin/blog.html',
        controller: 'AdminBlogCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/bloglist.html',
        controller: 'AdminBlogCtrl'
      })
      .when('/blog/:id', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
      })
      .otherwise({
        redirectTo: '/admin/login'
      });}] )
/* .run( function($rootScope, $location ,$cookieStore) {
  if($location.path().indexOf('admin')!== -1){
  if($cookieStore.get("username") && $cookieStore.get("password")){
    $rootScope.loggedUser=true;
  }
    // register listener to watch route changes
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.loggedUser!=true) {
        // no logged user, we should be going to #login
      $location.path( "/admin/login" );
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/admin" );
        }         
    });
    }
 })*/

 