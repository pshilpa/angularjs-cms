'use strict';

angular.module('angcmsApp').controller('AdminCategoryCtrl', ['$scope', 'angcmsFactory', '$filter', function ($scope, angcmsFactory, $filter) {

	$scope.categories = [];
	$scope.collectionName = "categories";
	$scope.catId = $scope.editCategory = false;

	$scope.$watch('categories', function () {
		$scope.getCategoryTree();
	});

	$scope.toggleEditForm = function (id) {
		$scope.category = "";
		$scope.editCategory = true;
		if (id) {
			$scope.editForm(id);
		}
	};

		$scope.deleteCategory = function (id) {
		angcmsFactory.deleteRecord($scope.collectionName,id).success(function () {
			$scope.status = 'Category Deleted! Refreshing Category list.';
		}).
		error(function (error) {
			$scope.status = 'Unable to delete Category: ' + error.message;
		});	
		$scope.editCategory = false;
		$scope.catId = false;
	};

	$scope.editForm = function (id) {
		angcmsFactory.getRecord($scope.collectionName, id).success(function (category) {
			$scope.category = category;
			$scope.catId = category._id['$oid'];
			if ($scope.category['_id']) {
				delete $scope.category['_id'];
			}
		}).error(function (error) {
			$scope.status = 'Unable to update catomer: ' + error.message;
		});
	};

	$scope.getCategories = function () {
		$scope.editCategory = false;
		angcmsFactory.getAllRecords($scope.collectionName).success(function (category) {

			$scope.categories = category;

		}).error(function (error) {
			$scope.status = 'Unable to load category data: ' + error.message;
		});
		// $scope.categories=categoryArray;
	};

	$scope.getCategoryTree = function () {

		var childCats = [];
		var categoryArray = $scope.categories;
		var j = 0;
		for (var i = 0; i < categoryArray.length; i++) {
			var currCust = categoryArray[i];
			if ($scope.categories[i] && currCust.parent_category) {
				childCats[j] = currCust;
				j++;
				//delete categoryArray[i];
				categoryArray.splice(i, 1);

			}
		}

		for (var i = 0; i < categoryArray.length; i++) {
			var currCat = categoryArray[i];
			if (categoryArray[i]) {
				var idx = $filter('find')(childCats, currCat['_id']['$oid'], 'parent_category');
				if (idx) {
					categoryArray[i]['child'] = idx;
					childCats.splice(childCats.indexOf(idx), 1);

				}
			}
		}
		return $scope.catTree = categoryArray;
	};


	$scope.insertCategory = function (id) {
		var category = this.category;
		angcmsFactory.insertRecord($scope.collectionName, category, id).success(function () {
			$scope.status = 'Inserted Category! Refreshing Category list.';
			$scope.categories.push(category);

		}).
		error(function (error) {
			$scope.status = 'Unable to insert Category: ' + error.message;
		});
		$scope.editCategory = false;
		$scope.getCategories();

	};

}]);
angular.module('angcmsApp').filter('find', function () {
	return function (arr, value, keyToCheck) {
		var i = 0;
		for (var keys in arr) {

			for (var key in arr[keys]) {
				if (key == keyToCheck) {
					if (arr[keys][key] == value) {
						return arr[keys];
					}
				}
				//return false;
			}
			//return false;
		}
	}
});