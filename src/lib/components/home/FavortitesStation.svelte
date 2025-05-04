<script>
	export let item;
	// export let liked = false;

	/**
	 * @description prodcd에 따라 아이콘을 변경하는 함수
	 * @param {string} prodcd - 제품 코드
	 */
	const prodcdSwitch = (prodcd) => {
		switch (prodcd) {
			case 'B027':
				return '휘';
			case 'D047':
				return '경';
			case 'B034':
				return '고';
			case 'C004':
				return '등유';
			case 'K015':
				return '부';
			default:
				return prodcd;
		}
	}
</script>
  
<li class="favorite_item">
	<div class="logo"></div>
	<div class="info_wrap">
		<div class="name">
			<span>{item.station_name}</span>
			<button type="button" class="like active"></button>
		</div>
		<ul class="oil_list">
			{#each item.oil_price as oil}
				<li class="oil_item">
					<div class="icon">{prodcdSwitch(oil.prodcd)}</div>
					<div class="price">{Number(oil.price).toLocaleString()}원</div>
				</li>
			{/each}
			<!-- <li class="oil_item">
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
			</li> -->
		</ul>
	</div>
</li>

<style>
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