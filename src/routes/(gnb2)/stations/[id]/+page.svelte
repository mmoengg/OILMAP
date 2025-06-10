<script>
    import Header from '$lib/components/common/Header.svelte';
    import { goto } from "$app/navigation";

    export let data

    const resOil = data.oil;
    console.log('resOil', resOil)
</script>

<section class="stations_container">
    <Header title={resOil.OS_NM} back={true} callFn={ () => goto('/stations') }/>
    <div>
        <h2>주유소 정보</h2>
        <p>상호: {resOil.OS_NM}</p>
        <p>주소: {resOil.NEW_ADR}</p>
        <p>전화번호: {resOil.TEL}</p>
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
</style>