<script>
	import Header from '$lib/components/common/Header.svelte';
	import HistoryContent from '$lib/components/history/HistoryContent.svelte';
	import FuelHistoryForm from '$lib/components/history/FuelHistoryForm.svelte';
	import { goto } from '$app/navigation';

	export let data;

	let resUser = data.user;
	let show = true
	let showForm = false;
	let title = '';
	
	let formData = {
		id: '',
		date: new Date().toString().slice(0, 21),
		amount: null,
		stationName: '',
		stationLiter: null,
		stationOil: '휘발유',
		stationPrice: null,
		cleaningCost: null,
		memo: ''
	};

	const loadList = async () => {
		try {
			const res = await fetch('/api/history', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: resUser.uid })
			});
			if (!res.ok) {
				throw new Error('Failed to load history');
			}
			const result = await res.json();
			data.history = result.history;
		} catch (error) {
			console.error('Error loading history:', error);
		}
	}

	const handleFormToggle = () => {
		showForm = !showForm;
		title = showForm ? '신규 주유 기록' : '';
		formData = {
			id: '',
			date: new Date().toString().slice(0, 21),
			amount: null,
			stationName: '',
			stationLiter: null,
			stationOil: '휘발유',
			stationPrice: null,
			cleaningCost: null,
			memo: ''
		};
	};
</script>


{#if show}
<section class="history_container">
	{#if showForm}
		<FuelHistoryForm user={resUser} bind:showForm {loadList} title={title} bind:formData />
	{/if}
	<Header title="주유 기록" back={true} callFn={() => { goto('/home') }} />
		<div class="content_wrap">
			<ul class="history_list">
			{#if data.history.length > 0}
				{#each data.history as item (item.id)}
					<HistoryContent items={item} bind:showForm bind:title bind:formData />
				{/each}
			{:else}
				<p>이력이 없습니다.</p>
			{/if}
			</ul>
		</div>
		<button type="button" class="buttn_add" on:click={handleFormToggle}>+</button>
</section>
{/if}

<style>
	.history_container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.content_wrap {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		border-radius: 14px;
		background: var(--color-white);
		display: flex;
		flex-direction: column;
	}

	.history_list {
		width: 100%;
		height: 100%;
		padding: 24px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
	.history_list::-webkit-scrollbar {
		display: none;
	}

	.buttn_add {
		position: absolute;
		top: 5px;
		right: 0px;
		width: 40px;
		height: 40px;
		border: none;
		font-size: 24px;
		color: var(--color-white);
		background: var(--color-main-gr);
		/* box-shadow: 0px 0px 16px rgba(61, 77, 119, 0.4); */
		border-radius: 99px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

</style>
  