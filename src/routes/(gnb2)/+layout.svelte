<script>
	  import '$lib/styles/global.css';
	  import { page } from '$app/stores';
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
/* 
	.nav_list {
		position: fixed;
		z-index: 100;
		bottom: 0;
		width: 100%;		
		height: 60px;
		max-width: 691px;
		margin: 0 auto;
		padding: 0 6px;
		background: var(--color-white);
		box-shadow: 0 -1px 5px rgba(0,0,0,0.03);
		border-top-left-radius: 18px;
		border-top-right-radius: 18px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		list-style: none;
	}

	.nav_list li {
		flex: 1 1 0;
		text-align: center;
	}

	.nav_list a {
		display: block;
		padding: 10px 0;
		color: var(--color-black-50);
		font-size: 12px;
		border-radius: 20px;
		text-decoration: none;
		transition: background 0.18s, color 0.18s;
	}

	.nav_list a:hover,
	.nav_list a:focus {
		background: var(--color-blue-light);
		color: var(--color-black);
	}

	.nav_list a.active{
		color: var(--color-text);
	} */
</style>