'use strict';

angular.module('angcmsApp').controller('AdminUserCtrl', ['$scope', 'angcmsFactory', '$cookieStore', '$location', '$rootScope', '$filter', function ($scope, angcmsFactory, $cookieStore, $location, $rootScope, $filter) {

	$scope.collectionName = "users";
	$scope.getUsers = function () {
		$scope.editUser = false;
		return angcmsFactory.getAllRecords($scope.collectionName).success(function (user) {
			$scope.Users = user;
		}).error(function (error) {
			$scope.status = 'Unable to load User data: ' + error.message;
		});
	};
	$scope.insertUser = function (id) {
		var user = this.User;
		angcmsFactory.insertRecord($scope.collectionName, user, id).success(function () {
			$scope.status = 'Inserted User! Refreshing User list.';
			$scope.Users.push(user);
		}).
		error(function (error) {
			$scope.status = 'Unable to insert User: ' + error.message;
		});
		$scope.editUser = false;
		this.User=null;
	};


		$scope.deleteUser = function (id) {
		 angcmsFactory.deleteRecord($scope.collectionName,id).success(function () {
			$scope.status = 'User Deleted! Refreshing User list.';
		}).
		error(function (error) {
			$scope.status = 'Unable to delete User: ' + error.message;
		});	
		$scope.editUser= false;
		$scope.User=null;
		$scope.userId = false;		
		$scope.getUsers();
	};
	$scope.editForm = function (id) {
		alert(id);
		angcmsFactory.getRecord($scope.collectionName, id).success(function (User) {
			$scope.User = User;
			$scope.userId = User._id['$oid'];
			if ($scope.User['_id']) {
				delete $scope.User['_id'];
			}
		}).error(function (error) {
			$scope.status = 'Unable to update User: ' + error.message;
		});
	};

	$scope.toggleEditForm = function (id) {
		$scope.User = null;
		$scope.editUser = true;
		if (id) {
			$scope.editForm(id);
		}

	};

	/*Login Form */
	$scope.logIn = function () {
		var allUsers = $scope.Users;

		var checkUser = $filter('find')(allUsers, $scope.username, 'username');
		if (checkUser) {
			if (checkUser.password == $scope.password) {
				$rootScope.loggedUser = true;
				$cookieStore.put("username", $scope.username);
				$cookieStore.put("password", $scope.password);
				$location.path("/admin");
			} else {
				alert('Wrong Password');
			}
		} else {
			alert('Sorry No User Present');
		}


	};
}]);