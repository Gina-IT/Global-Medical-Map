// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map_dentistry'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.543366, 129.259760), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map_dentistry= new kakao.maps.Map(mapContainer, mapOption); 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var dentistry = [
    {
        place_name: '강경남치과의원',
        address_name: '울산광역시 남구 굴화4길 31 (무거동)',
        english_address: '31, Gulhwa 4-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-7528',
        latlng: new kakao.maps.LatLng(35.552015, 129.264002)
    },
    {
        place_name: '강남웰치과의원',
        address_name: '울산광역시 남구 대학로 141 (무거동)',
        english_address: '141, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-223-2875',
        latlng: new kakao.maps.LatLng(35.547361, 129.261725)
    },
    {
        place_name: '굿모닝문수치과의원',
        address_name: '울산광역시 남구 대학로 159, 2층 (무거동)',
        english_address: '159, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-222-2875',
        latlng: new kakao.maps.LatLng(35.548814, 129.262560)
    },
    {
        place_name: '김종환치과의원',
        address_name: '울산광역시 남구 대학로 134, 4층 (무거동)',
        english_address: '134, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-3575',
        latlng: new kakao.maps.LatLng(35.546435, 129.261885)
    },
    {
        place_name: '뉴욕치과의원',
        address_name: '울산광역시 남구 대학로 157, 4층(무거동,부흥빌딩)',
        english_address: '157, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-232-2875',
        latlng: new kakao.maps.LatLng(35.548708, 129.262420)
    },
    {
        place_name: '더블유치과의원',
        address_name: '울산광역시 남구 대학로 136, 6층 (무거동)',
        english_address: '136, the sixth floor, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-221-1441',
        latlng: new kakao.maps.LatLng(35.546596, 129.262014)
    },
    {
        place_name: '램브란트치과의원',
        address_name: '울산광역시 남구 대학로 130, 4층 (무거동, 성진빌딩)',
        english_address: '130, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-7585',
        latlng: new kakao.maps.LatLng(35.54615270097174, 129.26164036386857)
    },
    {
        place_name: '무거리틀원소아치과의원',
        address_name: '울산광역시 남구 북부순환도로 23, 3층 (무거동)',
        english_address: '23, the 3rd floor, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-8200',
        latlng: new kakao.maps.LatLng(35.552129, 129.266329)
    },
    {
        place_name: '배광수치과의원',
        address_name: '울산광역시 남구 북부순환도로 29, 남운산호상가 (무거동)',
        english_address: '29, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-4664',
        latlng: new kakao.maps.LatLng(35.552111, 129.264889)
    },
    {
        place_name: '보람치과',
        address_name: '울산광역시 남구 대학로 110 (무거동)',
        english_address: '110, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-247-2812',
        latlng: new kakao.maps.LatLng(35.544691, 129.260994)
    },
    {
        place_name: '상아치과의원',
        address_name: '울산광역시 남구 대학로 138 (무거동, 신정빌딩)',
        english_address: '138, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-5417',
        latlng: new kakao.maps.LatLng(35.546771, 129.262129)
    },
    { 
        place_name: '새하나치과의원',
        address_name: '울산광역시 남구 대학로 152, 7층 (무거동, 대로빌딩)',
        english_address: '152, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-1128',
        latlng: new kakao.maps.LatLng(35.547961, 129.262867)
    },
    {
        place_name: '서울치과의원',
        address_name: '울산광역시 남구 북부순환도로 13, 6층 (무거동, 보령메디칼)',
        english_address: '13, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-2275',
        latlng: new kakao.maps.LatLng(35.551459, 129.265152)
    },
    {
        place_name: '세방치과의원',
        address_name: '울산광역시 남구 북부순환도로 12 (무거동)',
        english_address: '12, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-222-2879',
        latlng: new kakao.maps.LatLng(35.551050, 129.265360)
    },
    {
        place_name: '에덴가족치과의원',
        address_name: '울산광역시 남구 대학로 124 (무거동)',
        english_address: '124, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-9072',
        latlng: new kakao.maps.LatLng(35.545626, 129.261334)
    },
    {
        place_name: '웰츠치과의원',
        address_name: '울산광역시 남구 대학로 164, 203호 (무거동, 웰츠타워상가)',
        english_address: '164, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-277-4639',
        latlng: new kakao.maps.LatLng(35.548599, 129.263252)
    },
    {
        place_name: '유디무거치과의원(유디치과의원 울산무거점)',
        address_name: '울산광역시 남구 대학로 152, 9층 (무거동)',
        english_address: '152, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-222-6226',
        latlng: new kakao.maps.LatLng(35.547898, 129.262882)
    },
    {
        place_name: '제밀치과의원',
        address_name: '울산광역시 남구 대학로 128, 401호 (무거동)',
        english_address: '128, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-2822',
        latlng: new kakao.maps.LatLng(35.545973298645926, 129.26148640088567)
    },
    {
        place_name: '제이앤디(J&D)복이치과의원',
        address_name: '울산광역시 남구 북부순환도로 17, 1511~1512호 (무거동, 남운프라자)',
        english_address: '17, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-246-2828',
        latlng: new kakao.maps.LatLng(35.551688, 129.265422)
    },
    {
        place_name: '튼튼한치과의원',
        address_name: '울산광역시 남구 북부순환도로 52 (무거동)',
        english_address: '52, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-265-2244',
        latlng: new kakao.maps.LatLng(35.552418, 129.269389)
    },
    {
        place_name: '하이치과',
        address_name: '울산광역시 남구 대학로 58  (무거동)',
        english_address: '58, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-223-2804',
        latlng: new kakao.maps.LatLng(35.540622, 129.258217)
    },
    {
        place_name: '화이트치과의원',
        address_name: '울산광역시 남구 옥현로 117, 4층 (무거동)',
        english_address: '117, Okhyeon-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-3040',
        latlng: new kakao.maps.LatLng(35.547167, 129.262356)
    },
    {
        place_name: 'e아름다운치과의원',
        address_name: '울산광역시 남구 대학로 126, 4층 (무거동)',
        english_address: '126, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-222-2816',
        latlng: new kakao.maps.LatLng(35.545794, 129.261463)
    }
];

displayPlaces(dentistry, map_dentistry);



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places, map) {

    var listEl = document.getElementById('placesList_dentistry'), 
    menuEl = document.getElementById('menu_wrap_dentistry'),
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

    marker.setMap(map); // 지도 위에 마커를 표출합니다s
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

