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
		width: 100vw;
		height: 100vh;
		background: var(--color-text);
	}
	.main_content {
		width: 100%;
		height: 100%;
		max-width: 691px;
		margin: 0 auto;
		padding: 16px;
		background: var(--color-background);
		display: flex;
		align-items: start;
		justify-content: center;
	}
</style>