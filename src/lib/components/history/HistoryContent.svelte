<script>
	export let items = [];
	export let title;
	export let showForm;
	export let formData;

	console.log('items:', items);

	const handleClick = () => {
		showForm = true;
		title = "주유 기록 수정";
		formData = { 
			id: items.id,
			date: items.date,
			amount: items.amount,
			stationName: items.station_name,
			stationLiter: items.station_liter,
			stationOil: items.station_oil,
			stationPrice: items.station_price,
			cleaningCost: items.cleaning_cost,
			memo: items.memo
		};

	};
</script>


<li class="history_item">
	<button class="btn" type="button" on:click={handleClick}>
		<div class="date">{items.date.slice(0, 10)}</div>
		<div class="info_wrap">
			<div class="logo"></div>
			<div class="name_wrap">
				<div class="name">{items.station_name}</div>
				<div class="oil">{items.station_oil} {items.station_liter}L</div>
			</div>
			<div class="price_wrap">
				<div class="price">{items.station_price.toLocaleString()}원/L</div>
				<div class="amount">{items.amount.toLocaleString()}원</div>
			</div>
		</div>
	</button>
</li>

<style>
	.btn {
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
		gap: 10px;
		cursor: pointer;
	}
	.history_item {
		width: 100%;
		padding-bottom: 25px;
		border-bottom: 1px solid var(--color-blue-100);
		display: flex;
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