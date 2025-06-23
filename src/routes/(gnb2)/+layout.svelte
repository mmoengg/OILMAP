<script>
	  import '$lib/styles/global.css';
</script>

<div class="main_container">
	<div class="main_content">
		<slot />
	</div>
</div>

<style>
	.main_container {
		position: relative;
		width: 100dvw;
		height: 100dvh;
		background: var(--color-text);
	}
	.main_content {
		width: 100%;
		height: 100%;
		max-width: 691px;
		margin: 0 auto;
		padding: 16px;
		overflow: hidden;
		background: var(--color-background);
		display: flex;
		align-items: start;
		justify-content: center;
	}
	.main_container::-webkit-scrollbar {
		display: none;

	}
</style>