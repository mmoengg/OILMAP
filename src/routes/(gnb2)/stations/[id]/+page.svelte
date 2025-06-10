<script>
    import Header from '$lib/components/common/Header.svelte';
    import { goto } from "$app/navigation";
    import {onMount} from "svelte";

    export let data

    const resUser = data.user;
    const resOil = data.oil;
    const resFavorite = data.favorites;
    let favorite = false;
    console.log('resFavorite', resFavorite)


    /**
     * 유종 변환
     */
    const switchCategory = (prodcd) => {
        switch (prodcd) {
            case 'B027':
                return '휘발유';
            case 'D047':
                return '경유';
            case 'B034':
                return '고급휘발유';
            case 'C004':
                return '실내등유';
            case 'K015':
                return '자동차부탄';
            default:
                return '';
        }
    };

    /**
     * 관심 주유소 추가
     */
    const handleStationFavorite = async () => {
        const { UNI_ID: id, OS_NM: name, POLL_DIV_CO: poll } = resOil;
        try {
            if (!favorite) {
                const res = await fetch('/api/stations/addFavorite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: resUser.uid, stationId: id, stationName: name, pollDivCd: poll })
                });
                if (!res.ok) {
                    throw new Error('Failed to load favorite');
                }
                const result = await res.json();
                if (result.success) {
                    favorite = true;
                    console.log('즐겨찾기 추가 성공');
                } else {
                    console.error('즐겨찾기 추가 실패:', result.message);
                }
            } else {
                const res = await fetch('/api/stations/deleteFavorite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: resUser.uid, stationId: id })
                });
                if (!res.ok) {
                    throw new Error('Failed to load favorite');
                }
                const result = await res.json();
                if (result.success) {
                    favorite = false
                    console.log('즐겨찾기 삭제 성공');
                } else {
                    console.error('즐겨찾기 삭제 실패:', result.message);
                }
            }
        } catch (error) {
            console.error('Error loading favorite:', error);
        }
    };

    onMount(async () => {
        favorite = resFavorite.some(item => item.station_id === resOil.UNI_ID);
    })

</script>

<section class="stations_container">
    <Header title='' back={true} callFn={ () => goto('/stations') }/>

    <div class="stations_wrap">
        <h2>
            {resOil.OS_NM}
        </h2>
        <p>{resOil.NEW_ADR}</p>
        <p>{resOil.TEL}</p>
        <button type="button" class="favorite_icon" on:click={handleStationFavorite}>
            {#if favorite}
                <img src="/images/icon/icon_heart_on.png" alt="즐겨찾기 완료" />
            {:else}
                <img src="/images/icon/icon_heart_off.png" alt="즐겨찾기 미완료" />
            {/if}
        </button>
        <ul class="oil_list">
            {#each resOil.OIL_PRICE as oil}
                <li>
                    <p class="name">{switchCategory(oil.PRODCD)}</p>
                    <p class="price">{oil.PRICE.toLocaleString()}원</p>
                </li>
            {/each}
        </ul>
        <ul class="info_list">
            <li>{resOil.MAINT_YN === 'Y' ? '경정비 O' : '경정비 X'}</li>
        </ul>
    </div>
</section>

<style>
    .stations_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .stations_wrap {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    h2 {
        padding-top: 20px;
        font-size: 20px;
    }

    .favorite_icon {
        margin-top: 10px;
        width: 24px;
        height: 24px;
        padding: 0;
    }

    .oil_list {
        width: 100%;
        margin: 30px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .oil_list li {
        width: 100%;
        padding: 16px 20px;
        border-radius: 8px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .oil_list li .name {
        font-weight: 500;
    }
</style>