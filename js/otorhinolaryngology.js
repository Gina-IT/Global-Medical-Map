// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map_otorhinolaryngology'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.543366, 129.259760), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map_otorhinolaryngology= new kakao.maps.Map(mapContainer, mapOption); 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var otorhinolaryngology = [
    {
        place_name: '미래이비인후과의원',
        address_name: '울산광역시 남구 북부순환도로 23 (무거동)',
        english_address: '23, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-221-2653',
        latlng: new kakao.maps.LatLng(35.55204265400012, 129.26630821489422)
    },
    {
        place_name: '변준영 이비인후과',
        address_name: '울산광역시 남구 무거동 1437-4',
        english_address: '16, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-224-7482',
        latlng: new kakao.maps.LatLng(35.551328,129.265820)
    },
    {
        place_name: '새신화의원',
        address_name: '울산광역시 남구 옥현로58번길 4 (무거동)',
        english_address: '4, Okhyeon-ro 58beon-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-2300',
        latlng: new kakao.maps.LatLng(35.541275, 129.261898)
    },
    {
        place_name: '우리이비인후과의원',
        address_name: '울산광역시 남구 대학로 138, 8층 (무거동)',
        english_address: '138, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-2600',
        latlng: new kakao.maps.LatLng(35.546780, 129.262112)
    },
    {
        place_name: '윤이비인후과의원',
        address_name: '울산광역시 남구 대학로 141, 2층 (무거동)',
        english_address: '141, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-223-8787',
        latlng: new kakao.maps.LatLng(35.547341, 129.261756)
    }
];


displayPlaces(otorhinolaryngology, map_otorhinolaryngology);



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places, map) {

    var listEl = document.getElementById('placesList_otorhinolaryngology'), 
    menuEl = document.getElementById('menu_wrap_otorhinolaryngology'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = places[i].latlng,
            marker = addMarker(placePosition, i, map), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목을 click 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title, map);
            });

            itemEl.onclick =  function () {
                displayInfowindow(marker, title, map);
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    itemStr += '    <span>' +  places.address_name  + '</span>'; 
    itemStr += '    <span>' +  places.english_address  + '</span>';                  
    itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, map) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}


// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title, map) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

