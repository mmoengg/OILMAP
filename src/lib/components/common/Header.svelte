
<script>
	import { goto } from "$app/navigation";

	export let title = 'Header Title';
	export let back = false;
	export let callFn = () => { goto('/home') };
</script>

<div class="title_container">
	<div class="left">
		{#if back}
			<div class="button_wrap">
				<button type="button" on:click={callFn}></button>
			</div>
		{/if}
	</div>
	<div class="center">
		{title}
	</div>
	<div class="right"></div>
</div>


<style>
	.title_container {
		position: relative;
		width: 100%;
		min-height: 50px;
		/* margin-bottom: 10px; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left {
		position: absolute;
		left: 0;
	}

	.left .button_wrap {
		width: 20px;
		height: 30px;
		/* background: var(--color-white); */
		border-radius: 99px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left button {
		width: 14px;
		height: 14px;
		background: url('/images/icon/icon_arrow.png') no-repeat center center;
		background-size: 14px 14px;
		transform: rotate(90deg);
	}

	.center {
		font-weight: 500;
	}

	.right {
		position: absolute;
		right: 0;
	}


</style>