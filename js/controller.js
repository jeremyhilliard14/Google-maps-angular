var mapsApp = angular.module('mapsApp', []);

mapsApp.controller('mapsController', function ($scope){

    $scope.markers = [];
    $scope.map = new google.maps.Map(document.getElementById('map'), 
        {
          zoom: 4,
          //geographical center of the US
          center: new google.maps.LatLng(40.0000, -98.0000)
        });

    var infowindow = new google.maps.InfoWindow;
    
	
    function cityMarker (city){
		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
		var marker = new google.maps.Marker(
            {
                lat: Number(lat),
                lon: Number(lon),
			     map: $scope.map,
			     position: new google.maps.LatLng(lat, lon),
			     title: city.city,
                animation: google.maps.Animation.DROP
        });
        
        var contentString = '<div id="content">'+ '<h1>' + city.city + '</h1>' +
        '<div id="siteNotice">'+
        '<div id="pop">' + 'Total Population: ' + city.yearEstimate + '</div>' +
        '<div id="census">' + '2010 Census: ' + city.lastCensus + '</div>' +
        '<div id="change">' + 'Population Change: ' + city.change + '</div>' +
        '<div id="density">' + 'Population density: ' + city.lastPopDensity + '</div>' +
        '<div id="state">' + 'State: ' + city.state + '</div>' +
        '<div id="land">' + 'Land Area: ' +city.landArea + '</div>' +
        '<div id="directions"><button onclick="getDirections(' +lat+','+lon+')">Directions</button></div>'+
        '<div id="search"><button onclick="campgroundSearch(' +lat+ ','+lon+')">Search</button></div>'+
            '</div>'+
            '</div>';

        marker.addListener('click', function() {
          infowindow .setContent(contentString);
          infowindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
    }

    $scope.cityClick = function(i){
      google.maps.event.trigger($scope.markers[i],'click');
    }

    $scope.zoomCity = function(i){
        var i = document.getElementById('select-city').selectedIndex;
        $scope.map.setZoom(10);
        $scope.map.panTo({lat: $scope.markers[i].lat, lng: $scope.markers[i].lon});
        //campgroundSearch();
        // $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    
    getDirections = function(lat, lon){
        var origin = prompt("What City and State(e.g. Atlanta, GA) are you traveling from?");
        //document.getElementById('city-info').style.display="none";
        document.getElementById('directions').style.display="inline"
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map'),{
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directions'))

        //var origin = document.getElementById('').value
        var request = {
            origin: origin,
            destination: new google.maps.LatLng(lat, lon),
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status){
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(result);
            }
        });
    }

    $scope.cities = cities;
	   for(i = 0; i< cities.length; i++){
		    cityMarker(cities[i])
	   }
    var map;
    var infowindow;

    campgroundSearch = function(lat, lon){
            var location = new google.maps.LatLng(lat, lon);

            map = new google.maps.Map(document.getElementById('map'), {
              center: location,
              zoom: 10
            });

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: location,
              radius: 50000,
              type: ['campground']
            }, callback);
        }

          function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          }

          function createMarker(place) {
            var placeLoc = place.geometry.location;
            var icon = place.icon;
            console.log(place);
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
              icon: icon
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
          }
    
    reinit = function(){
        console.log("What!?")
        document.getElementById('directions').innerHTML='';
        $scope.map = new google.maps.Map(document.getElementById('map'), 
        {
          zoom: 4,
          //geographical center of the US
          center: new google.maps.LatLng(40.0000, -98.0000)
        });

        var infowindow = new google.maps.InfoWindow;
    
    
        function cityMarker (city){
            var latLon = city.latLon.split(',');
            var lat = latLon[0];
            var lon = latLon[1];
            var marker = new google.maps.Marker(
                {
                    lat: Number(lat),
                    lon: Number(lon),
                     map: $scope.map,
                     position: new google.maps.LatLng(lat, lon),
                     title: city.city,
                    animation: google.maps.Animation.DROP
            });
            
            var contentString = '<div id="content">'+ '<h1>' + city.city + '</h1>' +
            '<div id="siteNotice">'+
            '<div id="pop">' + 'Total Population: ' + city.yearEstimate + '</div>' +
            '<div id="census">' + '2010 Census: ' + city.lastCensus + '</div>' +
            '<div id="change">' + 'Population Change: ' + city.change + '</div>' +
            '<div id="density">' + 'Population density: ' + city.lastPopDensity + '</div>' +
            '<div id="state">' + 'State: ' + city.state + '</div>' +
            '<div id="land">' + 'Land Area: ' +city.landArea + '</div>' +
            '<div id="directions"><button onclick="getDirections(' +lat+','+lon+')">Directions</button></div>'+
            '<div id="search"><button onclick="campgroundSearch(' +lat+ ','+lon+')">Search</button></div>'+
                '</div>'+
                '</div>';

            marker.addListener('click', function() {
              infowindow .setContent(contentString);
              infowindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }

        $scope.cities = cities;
       for(i = 0; i< cities.length; i++){
            cityMarker(cities[i])
       }
    }

});
     
      