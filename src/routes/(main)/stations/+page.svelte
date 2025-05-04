<script>

	let searchTerm = '';
	let stations = [
		{ name: 'Station A', id: 1 },
		{ name: 'Station B', id: 2 },
		{ name: 'Station C', id: 3 },
		{ name: 'Station D', id: 4 },
	];
</script>

<section class="stations_container">
	<div class="search_wrap">
		<input type="text" placeholder="Search for a station..." class="search_input" bind:value={searchTerm} />
	</div>
	<ul class="stations_list">
		{#each stations.filter(station => station.name.toLowerCase().includes(searchTerm.toLowerCase())) as station}
			<li class="station_item" key={station.id}>
				<a href={`/stations/${station.id}`} class="station_link">{station.name}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.stations_container {
		display: flex;
		flex-direction: column;
		gap: 35px;
	}
	.search_wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.search_input {
		width: 100%;
		max-width: 400px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}
</style>