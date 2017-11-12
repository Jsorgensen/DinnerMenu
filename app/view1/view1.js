
'use strict';
angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', [ '$scope', '$http', function($scope, $http) {
  $scope.name = '';
  $scope.names = [{name:"Chris"}, {name:"Calvin"}];
  $scope.addName = function() {
    $scope.names.push( {'name':$scope.name} );
    $scope.name = '';
  };

  $scope.test = 'this is a test';
  $scope.doTest = function(){
    $scope.test = $scope.name;
  };

  $scope.getData = function(){
    $scope.test = 'pretest';

    var url = 'http://127.0.0.1:5984/dinner_meals/_design/view3/_view/object?limit=20&reduce=false&include_docs=true&conflicts=true';
    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.test = inputData(data);
    }).
    error(function(data, status, headers, config) {
      $scope.test = 'failure to get stuff...';
    });
  };
}]);

var rawData;
var menuItems = [];
var menuItem;
var itemName;

function inputData(data){
  rawData = data;

  menuItems = rawData.rows;

  menuItem = menuItems[0].value;

  itemName = menuItem.name;

  return itemName;
}