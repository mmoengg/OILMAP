<script>
    import { onMount } from 'svelte';

    export let latitude
    export let longitude
    export let getLocation = () => {}

    onMount(async () => {
        await getLocation();

        // 이미 로드된 경우 바로 지도 생성
        if (window.kakao && window.kakao.maps) {
            console.log('kakao 객체 있음');
            initMap();
            return;
        }

        // 스크립트 동적 로드
        const script = document.createElement('script');
        script.src = "http://dapi.kakao.com/v2/maps/sdk.js?appkey=50d5e4a4fe4d37a6a49c79dc9280219a&autoload=false";
        script.onload = () => {
            kakao.maps.load(() => {
                initMap();
            });
        };
        script.onerror = () => {
            console.error('스크립트 로드 실패');
        };
        document.head.appendChild(script);
    });

    function initMap() {
        const container = document.getElementById('map');
        console.log('container:', container);
        if (!container) {
            console.log('container 없음');
            return;
        }
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3
        };
        new kakao.maps.Map(container, options);
    }
</script>

<div id="map" style="width:100%;height:220px;"></div>
