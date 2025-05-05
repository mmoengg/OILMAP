<script>
	import Header from '$lib/components/common/Header.svelte';
	import { fly } from 'svelte/transition';

	export let showForm = false;
</script>

<div class="popup_container">
	<div class="popup_wrap" in:fly={{ y: 200, duration: 600 }}
	out:fly={{ y: 200, duration: 600 }}>
		<Header title="신규 기록" back={true} callFn={() => showForm = !showForm} />
		<div class="content_wrap">
			dd
		</div>
	</div>
</div>

<style>
	.popup_container {
		position: absolute;
		top: -16px;
		left: -16px;
		width: calc(100% + 32px);
		height: calc(100% + 32px);
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: start;
		justify-content: start;
		z-index: 1000;
	}

	.popup_wrap {
		width: 100%;
		height: 100%;
		padding: 16px;
		background: var(--color-white);
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;
		gap: 10px;
	}

	.content_wrap {
		width: 100%;
		height: 100%;
		padding: 24px;
		border-top: 1px solid var(--color-black-10);
		background: var(--color-white);
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;
		gap: 10px;
	}
</style>