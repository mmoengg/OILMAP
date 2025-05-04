<script>
	import Header from '$lib/components/common/Header.svelte';
	import HistoryContent from '$lib/components/history/HistoryContent.svelte';

	export let data;

	$: history = data?.history || [];
</script>

<section class="history_container">
	<Header title="주유 기록" back={true} />
	<div class="content_wrap">
		<ul class="history_list">
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
			<HistoryContent />
		</ul>
	</div>
	<button type="button" class="buttn_add">+</button>

<!-- {#if history.length > 0} -->
	<!-- {:else} -->
	<!-- <p>이력이 없습니다.</p> -->
<!-- {/if} -->
</section>

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
		width: 0px;
		height: 0px;
		background: transparent;
	}
	.history_list::-webkit-scrollbar-thumb {
		background: transparent;
	}
	.history_list::-webkit-scrollbar-track {
		background: transparent;
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
  