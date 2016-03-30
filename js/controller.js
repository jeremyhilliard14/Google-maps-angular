var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function ($scope){

       $scope.markers = [];
       $scope.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          //geographical center of the US
          center: new google.maps.LatLng(40.0000, -98.0000)
        });


	function createMarker (city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
		var marker = new google.maps.Marker(
    {
			map: $scope.map,
			position: new google.maps.LatLng(lat, lon),
			title: city.city,
      animation: google.maps.Animation.DROP,
		});

        var contentString = '<div id="content">'+ '<h1>' + city.city + '</h1>' +
        '<div id="siteNotice">'+
        '<div id="pop">' + 'Total Population: ' + city.yearEstimate + '</div>' +
        '<div id="census">' + '2010 Census: ' + city.lastCensus + '</div>' +
        '<div id="change">' + 'Population Change: ' + city.change + '</div>' +
        '<div id="density">' + 'Population density: ' + city.lastPopDensity + '</div>' +
        '<div id="state">' + 'State: ' + city.state + '</div>' +
        '<div id="land">' + 'Land Area: ' +city.landArea + '</div>' +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
	}


  $scope.cityClick = function(i){
    google.maps.event.trigger($scope.markers[i],'click');
  }

	$scope.cities = cities;
	for(i = 0; i< cities.length; i++){
		createMarker(cities[i])
	}

});










      // function initMap() {
      //   var nashville = {lat: 36.1718, lng: -86.7850};
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 4,
      //     center: nashville
      //   });

      //   var contentString = '<div id="content">'+
      //       '<div id="siteNotice">'+
      //       '</div>'+
      //       '<h1 id="firstHeading" class="firstHeading">Nashville</h1>'+
      //       '<div id="bodyContent">'+
      //       "<p><b>Nashville</b>, is the capital of the U.S. state of Tennessee and the county seat of Davidson County. Nashville is the largest city in Tennessee and is the fourth largest city in the Southeastern United States. It is located on the Cumberland River in the north-central part of the state. The city is a center for the music, healthcare, publishing, banking and transportation industries, and is home to numerous colleges and universities. Reflecting the city's position in state government, Nashville is home to the Tennessee Supreme Court's courthouse for Middle Tennessee. It is known as a center of the country music industry, earning it the nickname 'Music City U.S.A.'</p>"+
      //       '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      //       'https://en.wikipedia.org/wiki/Nashville,_Tennessee</a> '+
      //       '(last visited March 29, 2016).</p>'+
      //       '</div>'+
      //       '</div>';

      //   var infowindow = new google.maps.InfoWindow({
      //     content: contentString
      //   });

      //   var marker = new google.maps.Marker({
      //     position: nashville,
      //     map: map,
      //     title: 'Nashville'
      //   });
      //   marker.addListener('click', function() {
      //     infowindow.open(map, marker);
      //   });
      // }


