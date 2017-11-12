
'use strict';
angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', [ '$scope', '$http', function($scope, $http) {
  $scope.getData = function(){
    var url = 'http://127.0.0.1:5984/dinner_meals/_design/view3/_view/object?limit=20&reduce=false&include_docs=true&conflicts=true';
    $http.get(url).
    success(function(data, status, headers, config) {
      inputData($scope, data);
      $scope.options = menuTitles;
    }).
    error(function(data, status, headers, config) {
      $scope.options = 'failure to get stuff...';
    });
  };

  $scope.getData();
}]);

var rawData;
var menuItems = [];
var menuTitles = [];

function inputData($scope, data){
  rawData = data;

  menuItems = rawData.rows.map(row => row.value);

  menuTitles = menuItems.map(item => item.name);
  $scope.titles = menuTitles;
}