<script>
	export let data 

	console.log('data:', data)

	const mainOils = data.oil.map((item) => {
		if (item.prodName === '휘발유' || item.prodName === '자동차용경유') {
			return {
			...item,
			}
		}
	}).filter((item) => item !== undefined)
	console.log('mainOils:', mainOils)

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
			<!-- <li class="price_item">
				<div class="name">경유</div>
				<div class="values">
					<span class="rate">▼ 0.02</span>
					<span class="price">1,500.51원/L</span>
				</div>
			</li> -->
		</ul>
	</div>
	<div class="favorites_wrap">
		<div class="favorites_title">관심 <span class="title_number">2</span></div>
		<ul class="favorites_list">
			<li class="favorite_item">
				<div class="logo"></div>
				<div class="info_wrap">
					<div class="name">
						<span>플라트(주)서호주유소</span>
						<button type="button" class="like active"></button>
					</div>
					<ul class="oil_list">
						<li class="oil_item">
							<div class="icon">휘</div>
							<div class="price">1,500원</div>
						</li>
						<li class="oil_item">
							<div class="icon">경</div>
							<div class="price">1,500원</div>
						</li>
						<li class="oil_item">
							<div class="icon">고</div>
							<div class="price">1,500원</div>
						</li>
					</ul>
				</div>
			</li>
			<li class="favorite_item">
				<div class="logo"></div>
				<div class="info_wrap">
					<div class="name">
						<span>플라트(주)서호주유소</span>
						<button type="button" class="like"></button>
					</div>
					<ul class="oil_list">
						<li class="oil_item">
							<div class="icon">휘</div>
							<div class="price">1,500원</div>
						</li>
						<li class="oil_item">
							<div class="icon">경</div>
							<div class="price">1,500원</div>
						</li>
						<li class="oil_item">
							<div class="icon">고</div>
							<div class="price">1,500원</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</section>
  
<style>
	.home_container {
		width: 100%;
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
		/* width: 100%;
		margin-bottom: 26px;
		font-weight: 900;
		text-align: left; */
	}
	.price_list {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		gap: 14px;
	}
	.price_list .price_item {
		width: 100%;
		padding: 24px;
    	background: linear-gradient(135deg, var(--color-blue-start) 0%, var(--color-blue-end) 100%);
		color: var(--color-surface);
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
		/* background: var(--color-surface); */
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
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.favorite_item {
		width: 100%;
		padding: 14px;
		background: var(--color-surface);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 14px;
	}
	.favorite_item .logo {
		min-width: 50px;
		min-height: 50px;
		border-radius: 8px;
		background-color: var(--color-blue-100)
	}
	.favorite_item .info_wrap {
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
	.info_wrap .like {
		width: 14px;
		height: 14px;
		border: none;
		font-size: 14px;
		background-image: url('/images/icon/icon_heart_off.png');
		background-repeat: no-repeat;
		background-size: 14px 14px;
		cursor: pointer;
		transition: all 0.18s;
	}
	.info_wrap .like.active {
		background-image: url('/images/icon/icon_heart_on.png');
	}
	.info_wrap .oil_list {
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