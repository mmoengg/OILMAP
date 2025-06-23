<script>
	import FavoritesStation from '$lib/components/home/FavortitesStation.svelte';

	export let data 

	let resUser = data.user
	let userFlag = false

	const mainOils = data?.oil?.map((item) => {
		if (item.prodName === '휘발유' || item.prodName === '자동차용경유') {
			return {
			...item,
			}
		}
	}).filter((item) => item !== undefined)


	const logout = async () => {

		const req = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!req.ok) {
			alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
			return;
		}
		const res = await req.json();
		if (res.success) {
			alert('로그아웃 되었습니다.');
			window.location.href = '/';
		} else {
			alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
		}

	}

</script>
  
<section class="home_container">
	<div class="logo_wrap">
		<div class="logo">OilMap</div>
		<button class="profile" on:click={() => userFlag = !userFlag}>
			<img src={resUser?.profile?.photo_url} alt="profile"  />
		</button>
		{#if userFlag}
			<ul class="profile_menu">
				<!-- <li>내 정보</li> -->
				<li>
					<button type="button" on:click={logout}>
						로그아웃
					</button>
				</li>
			</ul>
		{/if}
	</div>
	<div class="price_wrap">
		{#if mainOils}
		<div class="price_title">유가 <p>{mainOils[0]?.tradeDate?.slice(0, 4) + '-' + mainOils[0]?.tradeDate?.slice(4, 6) + '-' + mainOils[0]?.tradeDate?.slice(6, 8)}</p> </div>
		<ul class="price_list">
			{#each mainOils as item}
				<li class="price_item">
					<div class="name">{item.prodName}</div>
					<div class="values">
						<span class="price">{item.price}원/L</span>
						<span class="rate">{item.diff}</span>
					</div>
				</li>
			{/each}
		</ul>
		{/if}
	</div>
	<div class="favorites_wrap">
		<div class="favorites_title">관심 <span class="title_number">{resUser?.favorites?.length}</span></div>
		<ul class="favorites_list">
			{#if resUser?.favorites?.length > 0}
				{#each resUser.favorites as station}
					<FavoritesStation bind:resUser item={station} />
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
	.home_container::-webkit-scrollbar {
		display: none;
	}

	.logo_wrap{
		position: relative;
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
		overflow: hidden;
		cursor: pointer;
	}
	.logo_wrap .profile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		background-color: aliceblue;
		border-radius: 999px;
	}
	.logo_wrap .profile_menu {
		position: absolute;
		top: 45px;
		right: 0;
		padding: 15px 20px;
		background-color: var(--color-white);
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	.profile_menu button {
		padding: 0;
		font-size: 14px;
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
		align-items: center;
		gap: 6px;
	}
	.price_title p {
		padding-top: 1px;
		font-size: 14px;
		font-weight: 400;
		color: var(--color-blue-700);
	}
	.price_list {
		width: 100%;
		display: flex;
		flex-direction: column;
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
		width: 100%;
		font-size: 18px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/*flex-direction: column;*/
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