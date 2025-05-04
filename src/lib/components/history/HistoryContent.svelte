<script>

</script>


<li class="history_item">
	<div class="date">2024-04-28</div>
	<div class="info_wrap">
		<div class="logo"></div>
		<div class="name_wrap">
			<div class="name">플라트(주)서호주유소</div>
			<div class="oil">휘발유 9L</div>
		</div>
		<div class="price_wrap">
			<div class="price">1,563원/L</div>
			<div class="amount">13,824원</div>
		</div>
	</div>
</li>

<style>
	
	.history_item {
		width: 100%;
		height: 100%;
		padding-bottom: 25px;
		display: flex;
		border-bottom: 1px solid var(--color-blue-100);
		align-items: center;
		justify-content: start;
		flex-direction: column;
		gap: 20px;
	}
	.history_item:last-child {
		padding-bottom: 0px;
		border-bottom: none;
	}
	
	.history_item .logo {
		min-width: 50px;
		min-height: 50px;
		background: var(--color-blue-100);
		border-radius: 99px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.history_item .date {
		width: 100%;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.5px;
		color: var(--color-black-50);
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.info_wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 10px;
	}
	.name_wrap {
		width: 100%;
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;
		gap: 8px;
	}
	.name_wrap .oil {
		width: 100%;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: start;
	}
	.name_wrap .name {
		width: 100%;
		font-size: 12px;
		color: var(--color-black-70);
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.price_wrap {
		width: 100%;
		display: flex;
		align-items: end;
		justify-content: center;
		flex-direction: column;
		gap: 8px;
	}
	.price_wrap .price {
		width: 100%;
		font-size: 12px;
		color: var(--color-black-70);
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: end;
	}
	.price_wrap .amount {
		color: var(--color-blue-start);
		font-size: 16px;
		font-weight: 700;
		white-space: nowrap;
	}
</style>