var mapsApp = angular.module('mapsApp', ['ngRoute']);

mapApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/map.html',
		controller: 'mapsController'
	});
	$routeProvider.when('/cities/:cityIndex',{
		templateUrl: 'pages/cities.html',
		controller: 'cityController'
	});
	$routeProvider.otherwise({
		redirectTo: '/',
	});
});

mapApp.controller('mainController', function($scope) {
	// MAIN CONTROLLER - PLACEHOLDER	
	$scope.dirClick = function(lat, lon){
		console.log('here');
	}
});