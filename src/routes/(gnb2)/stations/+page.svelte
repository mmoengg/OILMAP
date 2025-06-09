<script>
	import Header from '$lib/components/common/Header.svelte';

	export let data
	console.log('data', data);
	const resUser = data.user;
	$: stations = data.stations;
	console.log('stations', stations);
	let searchTerm = '';

	
	const handleStationFavorite = async (stationName) => {
		try {
			const res = await fetch('/api/stations/addFavorite', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: resUser.uid, stationName: stationName.trim() })
			});
			if (!res.ok) {
				throw new Error('Failed to load history');
			}
			const result = await res.json();
			stations = result.stations;
			console.log('stations', stations);
		} catch (error) {
			console.error('Error loading history:', error);
		}
	};
</script>

<section class="stations_container">
	<Header title="주유소" back={true} />
	<div class="title_wrap">
		<div class="search_box">
			<input type="text" placeholder="주유소명을 입력하세요" bind:value={searchTerm}
				   on:keydown={(e) => {if (e.key === 'Enter') {handleStationFavorite(searchTerm)}}} />
			<button on:click={() => handleStationFavorite(searchTerm)}>
				<img src="/images/icon/icon_search.svg" alt="검색 버튼" />
			</button>
		</div>
<!--		<div class="catregory_box">-->
<!--			<div class="select_wrap">-->
<!--				<select>-->
<!--					<option>휘발유</option>-->
<!--				</select>-->
<!--			</div>-->
<!--			<div class="select_wrap">-->
<!--				<select>-->
<!--					<option>3KM</option>-->
<!--				</select>-->
<!--			</div>-->
<!--			<div class="select_wrap">-->
<!--				<select>-->
<!--					<option>최저가순</option>-->
<!--				</select>-->
<!--			</div>-->
<!--		</div>-->
	</div>

	{#if stations}
	<ul class="stations_list">
		{#if stations.length > 0}
			{#each stations as station}
				<li class="station_item">
					<a href={`/stations/${station.id}`} class="info_wrap">
						<div class="name">
							{station.OS_NM}
							<button class="favorite_icon" on:click={() => handleStationFavorite(station.id)}>
								<img src="/images/icon/icon_heart_off.png" alt="즐겨찾기 미완료"/>
							</button>
						</div>
						<div class="info">
							<p>{station.NEW_ADR}
							</p>
						</div>
<!--						<ul class="oil_list">-->
<!--							<li class="oil_item">-->
<!--								<div class="icon">d</div>-->
<!--								<div class="price">1222원</div>-->
<!--							</li>-->
<!--						</ul>-->
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
		border-radius: 14px;
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

	/*.catregory_box {*/
	/*	width: 100%;*/
	/*	height: 50px;*/
	/*	display: flex;*/
	/*	align-items: center;*/
	/*	justify-content: start;*/
	/*	gap: 10px;*/
	/*}*/

	.stations_list {
		width: 100%;
		padding: 24px;
		background: var(--color-white);
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		gap: 24px;
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
	.favorite_icon {
		padding: 0;
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

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