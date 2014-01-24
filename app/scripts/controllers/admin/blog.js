'use strict';

angular.module('angcmsApp').controller('AdminBlogCtrl', ['$scope', 'angcmsFactory', '$filter', function ($scope, angcmsFactory, $filter) {
	$scope.collectionName = "blogs";
	$scope.getBlogs = function () {
		$scope.editBlog = false;
		return angcmsFactory.getAllRecords($scope.collectionName).success(function (blog) {
			$scope.Blogs = blog;
		}).error(function (error) {
			$scope.status = 'Unable to load Blog data: ' + error.message;
		});
	};
	$scope.insertBlog = function (id) {

		if (id) {
			this.Blog.updatedate = getCurrentDate();
		} else {
			this.Blog.createdate = this.Blog.updatedate = getCurrentDate();
		}
		var blog = this.Blog;
		angcmsFactory.insertRecord($scope.collectionName, blog, id).success(function () {
			$scope.status = 'Inserted Blog! Refreshing Blog list.';
			$scope.Blogs.push(blog);
		}).
		error(function (error) {
			$scope.status = 'Unable to insert Blog: ' + error.message;
		});
		$scope.editBlog = false;
		this.Blog = null;
		$scope.blogId=null;
	};
	
	$scope.deleteBlog = function (id) {
		angcmsFactory.deleteRecord($scope.collectionName,id).success(function () {
			$scope.status = 'Blog Deleted! Refreshing Blog list.';
		}).
		error(function (error) {
			$scope.status = 'Unable to delete Blog: ' + error.message;
		});	
		$scope.Blog = null;
		$scope.editBlog = false;
		$scope.blogId = false;		
		$scope.getBlogs();
	};

	$scope.editForm = function (id) {
		angcmsFactory.getRecord($scope.collectionName, id).success(function (Blog) {
			$scope.Blog = Blog;
			$scope.blogId = Blog._id['$oid'];
			if ($scope.Blog['_id']) {
				delete $scope.Blog['_id'];
			}
		}).error(function (error) {
			$scope.status = 'Unable to update catomer: ' + error.message;
		});
	};

	$scope.toggleEditForm = function (id) {	

		$scope.editBlog = true;
		if (id) {
			$scope.editForm(id);
		}

	};
}]);

function getCurrentDate() {
	var now = new Date();
	var date = now.getDate();
	var year = now.getFullYear();
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];
	var month = months[now.getMonth()]

	return month + ' ' + date + ', ' + year;
}