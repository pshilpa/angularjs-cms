'use strict';

angular.module('angcmsApp').factory('angcmsFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var dbUrl = 'https://api.mongolab.com/api/1/databases/mongocms/collections/{dbCollection}/?apiKey=A1WcKjfvr8PyYkbKq0ZXAb1pgjlMKG4T';
  var singleRcdbUrl = 'https://api.mongolab.com/api/1/databases/mongocms/collections/{dbCollection}/{id}/?apiKey=A1WcKjfvr8PyYkbKq0ZXAb1pgjlMKG4T';

  var angcmsFactory = {};

  angcmsFactory.insertRecord = function (collectionName, record, id) {
    if (id) {
      return $http.put($rootScope.getFinalApiUrl(collectionName, id), record);
    } else {
      return $http.post($rootScope.getFinalApiUrl(collectionName), record);
    }

  };

  angcmsFactory.deleteRecord = function (collectionName,id) {
    return $http.delete($rootScope.getFinalApiUrl(collectionName, id));
  };
  
  $rootScope.getFinalApiUrl = function (collectionName, id) {
    if (id) {
      var finalUrl = singleRcdbUrl.replace('{dbCollection}', collectionName);
      return finalUrl.replace('{id}', id);


    } else {
      return dbUrl.replace('{dbCollection}', collectionName);
    }
  };

  angcmsFactory.getAllRecords = function (collectionName) {
    return $http.get($rootScope.getFinalApiUrl(collectionName));
  };

  angcmsFactory.getRecord = function (collectionName, id) {
    return $http.get($rootScope.getFinalApiUrl(collectionName, id));
  };

  var meaningOfLife = 42;

  // Public API here
  return angcmsFactory;
}]);


angular.module('angcmsApp').factory('SessionService', function ($resource) {
  return $resource('/api/sessions');
});