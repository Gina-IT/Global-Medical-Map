// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map_oriental_medical_clinic'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.543366, 129.259760), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map_oriental_medical_clinic= new kakao.maps.Map(mapContainer, mapOption); 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var oriental_medical_clinic = [
    {
        place_name: '동의한의원',
        address_name: '울산광역시 남구 신복로 25 (무거동)',
        english_address: '25, Sinbok-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-7221',
        latlng: new kakao.maps.LatLng(35.548376, 129.259338)
    },
    {
        place_name: '라임의원(라임한의원)',
        address_name: '울산광역시 남구 북부순환도로 11, 3층 (무거동)',
        english_address: '11, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-972-7582',
        latlng: new kakao.maps.LatLng(35.551267, 129.264965)
    },
    {
        place_name: '맑은숲예인한의원',
        address_name: '울산광역시 남구 대학로 134 (무거동)',
        english_address: '134, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-5336',
        latlng: new kakao.maps.LatLng(35.546345, 129.261865)
    },
    {
        place_name: '명제한의원',
        address_name: '울산광역시 남구 대학로 161, 2층 (무거동)',
        english_address: '161, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-8485',
        latlng: new kakao.maps.LatLng(35.552189, 129.259417)
    },
    {
        place_name: '문수한의원',
        address_name: '울산광역시 남구 대학로 138 (무거동, 신정빌딩)',
        english_address: '138, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-223-7575',
        latlng: new kakao.maps.LatLng(35.546771, 129.262129)
    },
    {
        place_name: '민한의원',
        address_name: '울산광역시 남구 대학로169번길 9, 1층 (무거동)',
        english_address: '9, Daehak-ro 169beon-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-222-1300',
        latlng: new kakao.maps.LatLng(35.550168, 129.262322)
    },
    {
        place_name: '백한의원',
        address_name: '울산광역시 남구 북부순환도로 11, 지하1층 및2층 (무거동)',
        english_address: '11, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-8343',
        latlng: new kakao.maps.LatLng(35.551316, 129.264957)
    },
    {
        place_name: '본디올종로한의원',
        address_name: '울산광역시 남구 대학로 164 (무거동, 웰츠타워)',
        english_address: '164, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-224-3384',
        latlng: new kakao.maps.LatLng(35.548595, 129.263260)
    },
    {
        place_name: '사대한의원',
        address_name: '울산광역시 남구 무거동 1437-4',
        english_address: '16, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-223-6475',
        latlng: new kakao.maps.LatLng(35.551264, 129.265686)
    },
    {
        place_name: '수현한의원',
        address_name: '울산광역시 남구 신복로 27, 2층 (무거동)',
        english_address: '27, Sinbok-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-1007',
        latlng: new kakao.maps.LatLng(35.548471, 129.259161)
    },
    {
        place_name: '유창한의원',
        address_name: '울산광역시 남구 옥현로 92-17 202호(무거동)',
        english_address: '92-27, Okhyeon-ro, Nam-gu, Ulsan, Republic of Korea Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-8600',
        latlng: new kakao.maps.LatLng(35.544919, 129.262588)
    },
    {
        place_name: '이덕기한의원',
        address_name: '울산광역시 남구 신복로 12-1, 2층 (무거동)',
        english_address: '12-1, Sinbok-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-275-6969',
        latlng: new kakao.maps.LatLng(35.547864, 129.260896)
    },
    {
        place_name: '천일한의원',
        address_name: '울산광역시 남구 남부순환도로 37 (무거동)',
        english_address: '37, Nambusunhwando-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-3460',
        latlng: new kakao.maps.LatLng(35.546206, 129.264381)
    },
    {
        place_name: '천지인한의원',
        address_name: '울산광역시 남구 북부순환도로 29 (무거동, 남운산호상가)',
        english_address: '29, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-1187',
        latlng: new kakao.maps.LatLng(35.553262, 129.266445)
    }
];  


displayPlaces(oriental_medical_clinic, map_oriental_medical_clinic);



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places, map) {

    var listEl = document.getElementById('placesList_oriental_medical_clinic'), 
    menuEl = document.getElementById('menu_wrap_oriental_medical_clinic'),
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

