<script>
	import FavoritesStation from '$lib/components/home/FavortitesStation.svelte';

	export let data 

	const userData = data.user

	const mainOils = data.oil.map((item) => {
		if (item.prodName === '휘발유' || item.prodName === '자동차용경유') {
			return {
			...item,
			}
		}
	}).filter((item) => item !== undefined)

</script>
  
<section class="home_container">
	<div class="logo_wrap">
		<div class="logo">OilMap</div>
		<div class="profile"></div>
	</div>
	<div class="price_wrap">
		<div class="price_title">유가</div>
		<ul class="price_list">
			{#each mainOils as item}
				<li class="price_item">
					<div class="name">{item.prodName}</div>
					<div class="values">
						<span class="rate">{item.diff}</span>
						<span class="price">{item.price}원/L</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<div class="favorites_wrap">
		<div class="favorites_title">관심 <span class="title_number">{userData.favorites?.length}</span></div>
		<ul class="favorites_list">
			{#if userData.favorites?.length > 0}
				{#each userData.favorites as station}
					<FavoritesStation item={station} />
				{/each}
			{:else}
				<li class="favorite_item_empty">관심 주유소가 없습니다.</li>
			{/if}
		</ul>
	</div>
</section>
  
<style>
	.home_container {
		width: 100%;
		height: 100%;
		padding-bottom: 60px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 35px;
	}

	.logo_wrap{
		width: 100%;
		height: 50px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo_wrap .logo {
		font-size: 22px;
		font-weight: 700;
		color: var(--color-black);
	}
	.logo_wrap .profile {
		width: 40px;
		height: 40px;
		background-color: black;
		border-radius: 999px;
	}

	.price_wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
	}
	.price_title {
		width: 100%;
		margin-bottom: 26px;
		font-weight: 900;
		text-align: left;
		display: flex;
		gap: 6px;
	}
	.price_list {
		width: 100%;
		display: flex;
		gap: 14px;
	}
	.price_list .price_item {
		width: 100%;
		padding: 24px;
    	background: linear-gradient(135deg, var(--color-blue-start) 0%, var(--color-blue-end) 100%);
		color: var(--color-white);
		border-radius: 14px;
		font-size: 14px;
		display: flex;
		align-items: start;
		justify-content: space-between;
		flex-direction: column;
		gap: 16px;
	}
	.price_item .name {
		font-size: 14px;
	}
	.price_item .values {
		font-size: 18px;
		display: flex;
		align-items: start;
		justify-content: space-between;
		flex-direction: column;
		gap: 6px;
	}
	.price_item .values .rate {
		font-size: 14px;
		color: var(--color-blue-500);
	}

	.favorites_wrap {
		width: 100%;
		/* padding: 24px; */
		/* background: var(--color-white); */
		border-radius: 14px;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
	}
	.favorites_title {
		width: 100%;
		margin-bottom: 26px;
		font-weight: 900;
		text-align: left;
		display: flex;
		gap: 6px;
	}
	.favorites_title .title_number {
		color: var(--color-blue-700);
	}
	.favorites_list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.favorite_item_empty {
		width: 100%;
		height: 200px;
		padding: 14px;
		color: var(--color-blue-700);
		background: var(--color-white);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
	}
</style>