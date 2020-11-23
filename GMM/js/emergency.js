// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map_emergency'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(35.543366, 129.259760), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var emergency = [
    {
        place_name: '굿모닝병원',
        address_name: '울산광역시 남구 삼산로 110 (달동)',
        english_address: '110, Samsan-ro, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-259-9000',
        latlng: new kakao.maps.LatLng(35.5349691, 129.3198846)
    },
    {
        place_name: '동강병원',
        address_name: '울산광역시 중구 태화로 239 (태화동)',
        english_address: '239, Taehwa-ro, Jung-gu, Ulsan, Republic of Korea',
        phone: '052-241-1114',
        latlng: new kakao.maps.LatLng(35.5534076, 129.3020905)
    },
    {
        place_name: '동천동강병원',
        address_name: '울산광역시 중구 외솔큰길 215 (남외동, 동천동강병원)',
        english_address: '215, Oesolkeun-gil, Jung-gu, Ulsan, Republic of Korea',
        phone: '052-702-3114',
        latlng: new kakao.maps.LatLng(35.5685770, 129.3505130)
    },
    {
        place_name: '울산대학교병원',
        address_name: '울산광역시 동구 방어진순환도로 877, 울산대학교병원 (전하동)',
        english_address: '877, Bangeojinsunhwando-ro, Dong-gu, Ulsan, Republic of Korea',
        phone: '052-250-7000',
        latlng: new kakao.maps.LatLng(35.5200674, 129.4289868)
    },
    {
        place_name: '울산병원',
        address_name: '울산광역시 남구 월평로171번길 13 (신정동)',
        english_address: '13, Wolpyeong-ro 171beon-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-259-5000',
        latlng: new kakao.maps.LatLng(35.5462090, 129.3230784)
    },
    {
        place_name: '울산시티병원',
        address_name: '울산광역시 북구 산업로 1007 (연암동)',
        english_address: '1007, Saneop-ro, Buk-gu, Ulsan, Republic of Korea',
        phone: '052-280-9000',
        latlng: new kakao.maps.LatLng(35.5829212, 129.3592591)
    },
    {
        place_name: '울산세민병원',
        address_name: '울산광역시 중구 학성로 184 (학성동)',
        english_address: '184, Hakseong-ro, Jung-gu, Ulsan, Republic of Korea',
        phone: '052-292-2000',
        latlng: new kakao.maps.LatLng(35.5528549, 129.3416622)
    },
    {
        place_name: '울산제일병원',
        address_name: '울산광역시 남구 남산로354번길 26 (신정동)',
        english_address: '26, Namsan-ro 354beon-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-220-3300',
        latlng: new kakao.maps.LatLng(35.5482242, 129.3068910)
    },
    {
        place_name: '울산H병원',
        address_name: '울산광역시 중구 화합로 363 (반구동)',
        english_address: '363, Hwahap-ro, Jung-gu, Ulsan, Republic of Korea',
        phone: '052-290-7100',
        latlng: new kakao.maps.LatLng(35.5583583, 129.3407750)
    },
    {
        place_name: '울산중앙병원',
        address_name: '울산광역시 남구 문수로480번길 10 (신정동)',
        english_address: '10, Munsu-ro 480beon-gil, Nam-gu, Ulsan, Republic of Korea',
        phone: '052-226-1100',
        latlng: new kakao.maps.LatLng(35.5315728, 129.3052214)
    }
];


displayPlaces(emergency);
displayPagination(pagination_emergency);



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList_emergency'), 
    menuEl = document.getElementById('menu_wrap_emergency'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = places[i].latlng,
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목을 click 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title);
            });

            itemEl.onclick =  function () {
                displayInfowindow(marker, title);
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
function addMarker(position, idx) {
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
    var paginationEl = document.getElementById('pagination'),
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
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}