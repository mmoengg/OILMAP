<script>
    import Header from '$lib/components/common/Header.svelte';
    import proj4 from 'proj4';
    import Map from '$lib/components/stations/Map.svelte'
    import { onMount } from "svelte";

    export let data
    console.log('data', data);
    const resUser = data.user;
    $: stations = data.stations;
    let searchName = '';
    let searchCategory = {
        prodcd: 'B027',
        radius: '3000',
        sort: '2'
    }

    // proj4 정의
    proj4.defs("KATEC", "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");

    const wgs84 = 'EPSG:4326'; // 위경도
    const katec = 'KATEC';     // KATEC
    let latitude = null; // 현재 위치의 위도(y)
    let longitude = null; // 현재 위치의 경도(x)
    let utmX = null; // UTM-K X좌표
    let utmY = null; // UTM-K Y좌표
    let errorMsg = '';

    const switchCategory = (prodcd) => {
        switch (prodcd) {
            case 'B027':
                return '휘';
            case 'D047':
                return '경';
            case 'B034':
                return '고';
            case 'C004':
                return '실';
            case 'K015':
                return '자';
            default:
                return '';
        }
    };


    /**
     * 현재 위치
     */
    const getLocation = async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    latitude = pos.coords.latitude;
                    longitude = pos.coords.longitude;
                    // 좌표 변환
                    [utmX, utmY] = proj4(wgs84, katec, [longitude, latitude]);
                    // console.log('WGS84:', latitude, longitude);
                    // console.log('UTM-K:', utmX, utmY);
                    resolve({ longitude, latitude, utmX, utmY });
                },
                (err) => {
                    errorMsg = err.message;
                    reject(err);
                }
            );
        });
    }

    /**
     * 현재 위치로 주유소 검색
     */
    const handleStationSearchByLocation = async () => {
        try {
            const res = await fetch('/api/stations/searchStationsByLocation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: resUser.uid,
                    latitude: utmY, // y
                    longitude: utmX, // x
                    prodcd: searchCategory.prodcd,
                    radius: searchCategory.radius,
                    sort: searchCategory.sort
                })
            });
            if (!res.ok) {
                throw new Error('Failed to load history');
            }
            const result = await res.json();
            stations = result.stations;
            // console.log('search stations by location', stations);
        } catch (error) {
            console.error('Error loading search stations by location:', error);
        }
    };

    /**
     * 주유소 검색
     */
    const handleStationSearch = async (stationName) => {
        try {
            const res = await fetch('/api/stations/searchStations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: resUser.uid, stationName: stationName.trim() })
            });
            if (!res.ok) {
                throw new Error('Failed to load history');
            }
            const result = await res.json();
            stations = result.stations;
            console.log('search stations', stations);
        } catch (error) {
            console.error('Error loading history:', error);
        }
    };

    /**
     * 관심 주유소 추가
     */
    const handleStationFavorite = async (station) => {
        event.preventDefault();

        const { UNI_ID: id, OS_NM: name, POLL_DIV_CD: poll } = station;
        try {
            const res = await fetch('/api/stations/addFavorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: resUser.uid, stationId: id, stationName: name, pollDivCd: poll })
            });
            if (!res.ok) {
                throw new Error('Failed to load history');
            }
            const result = await res.json();
            console.log('favorite stations', stations);
        } catch (error) {
            console.error('Error loading history:', error);
        }
    };

    onMount(async () => {
        await getLocation();
        await handleStationSearchByLocation();
    })
</script>

<section class="stations_container">
    <Header title="주유소" back={true} />
    <div class="title_wrap">
        <div class="search_box">
            <input type="text" placeholder="주유소명을 입력하세요" bind:value={searchName}
                   on:keydown={(e) => {if (e.key === 'Enter') {handleStationSearch(searchName)}}} />
            <button on:click={() => handleStationSearch(searchName)}>
                <img src="/images/icon/icon_search.svg" alt="검색 버튼" />
            </button>
        </div>
        <div class="category_box">
            <div class="select_wrap">
                <select bind:value={searchCategory.prodcd} on:change={handleStationSearchByLocation}>
                    <option value="B027">휘발유</option>
                    <option value="D047">경유</option>
                    <option value="B034">고급휘발유</option>
                    <option value="C004">실내등유</option>
                    <option value="K015">자동차부탄</option>
                </select>
            </div>
            <div class="select_wrap">
                <select bind:value={searchCategory.radius} on:change={handleStationSearchByLocation}>
                    <option value="3000">3KM 이내</option>
                    <option value="5000">5KM 이내</option>
                    <option value="10000">10KM 이내</option>
                </select>
            </div>
            <div class="select_wrap">
                <select bind:value={searchCategory.sort} on:change={handleStationSearchByLocation}>
                    <option value="1">가격순</option>
                    <option value="2">거리순</option>
                </select>
            </div>
        </div>
    </div>

    <div class="map_box">
        <Map {getLocation} bind:stations bind:latitude bind:longitude />
    </div>

    {#if stations}
        <ul class="stations_list">
            {#if stations.length > 0}
                {#each stations as station}
                    <li class="station_item">
                        <a href={`/stations/${station.id}`} class="info_wrap">
                            <div class="name">
                                {station.OS_NM}
                                <!--							<button type="button" class="favorite_icon" on:click={() => handleStationFavorite(station)}>-->
                                <!--								<img src="/images/icon/icon_heart_off.png" alt="즐겨찾기 미완료"/>-->
                                <!--							</button>-->
                            </div>
                            {#if station.NEW_ADR}
                                <div class="info">
                                    <p>{station.NEW_ADR}</p>
                                </div>
                            {/if}
                            {#if station.PRICE}
                                <ul class="oil_list">
                                    <li class="oil_item">
                                        <div class="icon">{switchCategory(searchCategory.prodcd)}</div>
                                        <div class="price">{station.PRICE}원</div>
                                    </li>
                                </ul>
                            {/if}
                        </a>
                    </li>
                {/each}
            {:else if stations.length === 0}
                <li class="station_item">검색 결과가 없습니다.</li>
            {/if}
        </ul>
    {/if}
</section>

<style>
    .stations_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .title_wrap {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
    }

    .search_box {
        position: relative;
        width: 100%;
    }
    .search_box input {
        width: 100%;
        height: 44px;
        padding: 0 16px;
        border-radius: 8px;
        border: 1px solid var(--color-gray-300);
        font-size: 14px;
        background-color: var(--color-white);
        outline: none;
    }
    .search_box button {
        position: absolute;
        top: 12px;
        right: 22px;
        padding: 0;
        width: 18px;
        height: 18px;

    }
    .search_box button img {
        width: 100%;
        height: 100%;
    }

    .category_box {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 10px;
    }

    .map_box {
        width: 100%;
    }

    .stations_list {
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--color-white);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        overflow-y: auto;
    }
    .station_item {
        font-size: 14px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--color-blue-100);
    }
    .station_item:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }
    /*.favorite_icon {*/
    /*	padding: 0;*/
    /*	width: 16px;*/
    /*	height: 16px;*/
    /*	display: flex;*/
    /*	align-items: center;*/
    /*	justify-content: center;*/
    /*}*/

    .station_item .info {
        font-size: 14px;
        color: var(--color-gray-600);
        width: 100%;
        text-align: left;
        margin-top: 4px;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        gap: 8px;

    }

    .info_wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        gap: 8px;
    }
    .info_wrap .name {
        width: 100%;
        font-weight: 500;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .oil_list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 12px;
    }
    .oil_list .oil_item {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .oil_item .icon {
        width: 16px;
        height: 16px;
        font-size: 10px;
        color: var(--color-blue-700);
        border-radius: 99px;
        background-color: var(--color-blue-100);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>