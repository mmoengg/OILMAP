<script>
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";
    import proj4 from 'proj4';

    export let latitude
    export let longitude
    export let stations = []
    export let getLocation = () => {}

    // proj4 정의
    proj4.defs("KATEC", "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");
    const wgs84 = 'EPSG:4326';
    const katec = 'KATEC';
    let utmX = null; // UTM-K X좌표
    let utmY = null; // UTM-K Y좌표
    let map = null; // 지도 객체
    let positions = []

    onMount(async () => {
        await getLocation();

        // 이미 로드된 경우 바로 지도 생성
        if (window.kakao && window.kakao.maps) {
            // console.log('kakao 객체 있음');
            initMap();
            initMarkers();
            return;
        }

        // 스크립트 동적 로드
        const script = document.createElement('script');
        script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=50d5e4a4fe4d37a6a49c79dc9280219a&autoload=false";
        script.onload = () => {
            kakao.maps.load(() => {
                initMap();
                initMarkers();
            });
        };
        script.onerror = () => {
            console.error('스크립트 로드 실패');
        };
        document.head.appendChild(script);
    });

    const initMap = () => {
        const container = document.getElementById('map');
        if (!container) {
            // console.log('container 없음');
            return;
        }
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 6
        };
        // console.log('지도 생성', options);
        map = new kakao.maps.Map(container, options);
    }

    const initMarkers = () => {
        const container = document.getElementById('map');
        if (!container) {
            // console.log('container 없음');
            return;
        }

        stations.forEach((station, i) => {
            [utmX, utmY] = proj4(katec, wgs84, [station.GIS_X_COOR, station.GIS_Y_COOR]); // 여긴 경도 위도 순서

            const position = {
                title: station.UNI_ID,
                latlng: new kakao.maps.LatLng(utmY, utmX),
            }
            positions.push(position)
        });

        for (let i = 0; i < positions.length; i++) {
            const marker = new kakao.maps.Marker({
                position: positions[i].latlng,
                title : positions[i].title,
            });

            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
            let iwContent = '<div style="padding:5px;">Hello World!</div>'
            let iwRemoveable = true;

            // 마커에 표시할 인포윈도우를 생성합니다
            let infowindow = new kakao.maps.InfoWindow({
                content: iwContent, // 인포윈도우에 표시할 내용
                removable : iwRemoveable
            });

            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));

            marker.setMap(map);
        }

        function makeOverListener(map, marker, infowindow) {
            return function () {
                goto('/stations/' + marker.getTitle());
            }
        }
    }
</script>

<div id="map" style="width:100%;height:300px;"></div>
