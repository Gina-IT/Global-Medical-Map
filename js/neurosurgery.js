// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map_neurosurgery'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.543366, 129.259760), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map_neurosurgery= new kakao.maps.Map(mapContainer, mapOption); 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var neurosurgery = [
    {
        place_name: '시민건강의원',
        address_name: '울산광역시 남구 북부순환도로 48 (무거동)',
        english_address: '48, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-221-0675',
        latlng: new kakao.maps.LatLng(35.552508, 129.268885)
    },
    {
        place_name: '원정신건강의학과의원',
        address_name: '울산광역시 남구 북부순환도로 24 (무거동)',
        english_address: '24, Bukbusunhwan-doro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-8070',
        latlng: new kakao.maps.LatLng(35.55162476051311, 129.2664740914464)
    },
    {
        place_name: '페밀리신경외과의원',
        address_name: '울산광역시 남구 대학로 144, 2,3,8층 (무거동)',
        english_address: '144, Daehak-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-249-4100',
        latlng: new kakao.maps.LatLng(35.547389, 129.262532)
    }
];


displayPlaces(neurosurgery, map_neurosurgery);
displayPagination(pagination_neurosurgery);



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places, map) {

    var listEl = document.getElementById('placesList_neurosurgery'), 
    menuEl = document.getElementById('menu_wrap_neurosurgery'),
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

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination_neurosurgery'),
        fragment = document.createDocumentFragment(),
        i; 

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title, map) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

