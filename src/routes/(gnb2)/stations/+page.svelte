<script>
	import Header from '$lib/components/common/Header.svelte';
	import { goto } from "$app/navigation";

	let searchTerm = '';
	let stations = [
		{ name: 'Station A', id: 1 },
		{ name: 'Station B', id: 2 },
		{ name: 'Station C', id: 3 },
		{ name: 'Station D', id: 4 },
	];
</script>

<section class="stations_container">
	<Header title="주유소" back={true} />
	<div class="title_wrap">
		<div class="catregory_wrap">
			<div class="select_wrap">
				<select>
					<option>휘발유</option>
				</select>
			</div>
			<div class="select_wrap">
				<select>
					<option>3KM</option>
				</select>
			</div>
			<div class="select_wrap">
				<select>
					<option>최저가순</option>
				</select>
			</div>
		</div>
	</div>
	
	<ul class="stations_list">
		<li class="station_item">
			<div class="info_wrap">
				<div class="name">하안단지주유소</div>
				<ul class="oil_list">
					<li class="oil_item">
						<div class="icon">d</div>
						<div class="price">1222원</div>
					</li>
				</ul>
			</div>
		</li>
		<!-- {#each stations.filter(station => station.name.toLowerCase().includes(searchTerm.toLowerCase())) as station}
			<li class="station_item" key={station.id}>
				<a href={`/stations/${station.id}`} class="station_link">{station.name}</a>
			</li>
		{/each} -->
	</ul>
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
	
	.catregory_wrap {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 10px;
	}

	.stations_list {
		width: 100%;
		padding: 24px;
		background: var(--color-white);
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
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