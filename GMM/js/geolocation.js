// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
function getLocation(map){
    if (navigator.geolocation) {
        
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">You are here</div>'; // 인포윈도우에 표시될 내용입니다
            
            // 마커와 인포윈도우를 표시합니다
            displayLocationMarker(locPosition, message, map);            
          });
        
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다       
        alert('cannot check your location');
    }
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayLocationMarker(locPosition, message, map) {

    // 마커를 생성합니다
    var locMarker = addLocation(locPosition, map);
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, locMarker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}    

function addLocation(locposition, map){
    var imageSrc = "/image/placeholder.png", // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(34, 39); // 마커이미지의 크기입니다
      
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var locMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var locMarker = new kakao.maps.Marker({
        map: map
        position: locposition, 
        image: locMarkerImage // 마커이미지 설정 
    });

    return locMarker;
}
