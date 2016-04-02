var mapsApp = angular.module('mapsApp', ['ngRoute']);

mapsApp.config(function($routeProvider){

	//console.log($routeProvider);

	$routeProvider.when('/',{
		templateUrl: 'pages/mapview.html',
		controller: 'mapsController'
	});
	
});


mapsApp.controller('mapsController', function($scope){
	

})