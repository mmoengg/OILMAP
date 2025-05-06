<script>
	import Header from '$lib/components/common/Header.svelte';
	import { fly } from 'svelte/transition';

	export let showForm = false;

	const handleClick = () => {
		showForm = !showForm;
	};
</script>

<div class="popup_container">
	<div class="popup_wrap" in:fly={{ y: 200, duration: 600 }}
	out:fly={{ y: 200, duration: 600 }}>
		<Header title="신규 기록" back={true} callFn={() => showForm = !showForm} />
		<div class="content_wrap">
			<h1 class="station_name">서호플라트</h1>
			<ul class="input_list">
				<li>
					<div class="subtitle">날짜</div>
					<div class="input_wrap">
						<input type="text"/>
					</div>
				</li>
				<li>
					<div class="subtitle">주유 금액</div>
					<div class="input_wrap">
						<input type="nubmer" />
					</div>
				</li>
				<li class="twice">
					<div class="item_wrap">
						<div class="subtitle">유종</div>
							<div class="input_wrap">
								<select>
									<option value="경유">경유</option>
									<option value="휘발유">휘발유</option>
									<option value="LPG">LPG</option>
								</select>
							</div>
						</div>
					<div class="item_wrap">
						<div class="subtitle">주유량</div>
						<div class="input_wrap">
							<input type="text"/>
						</div>
					</div>
				</li>
				<li>
					<div class="subtitle">주유 금액</div>
					<div class="input_wrap">
						<input type="text" />
					</div>
				</li>
				<li>
					<div class="subtitle">세차비</div>
					<div class="input_wrap">
						<input type="text" />
					</div>
				</li>
				<li>
					<div class="subtitle">메모</div>
					<div class="">
						<textarea />
					</div>
				</li>
			</ul>
			<div class="button_wrap">
				<button type="button" on:click={handleClick}>추가</button>
			</div>
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
		gap: 40px;
	}

	.station_name {
		width: 100%;
		height: 40px;
		font-size: 24px;
		font-weight: 700;
		color: var(--color-black-100);
		display: flex;
		align-items: center;
		justify-content: start;
	}

	ul, li {
		width: 100%;
	}
	select {
		border: none;
		background: url(/images/icon/icon_arrow.png) no-repeat 95% 50% / 10px auto;
	}
	input,
	select,
	textarea {
		width: 100%;
		height: 44px;
		/* height: 100%; */
		font-size: 16px;
		font-weight: 400;
		border-bottom: 1px solid var(--color-black-10);
		padding: 8px;
		box-sizing: border-box;
	}
	input[type="text"]:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-main-gr);
		transition: border-color 0.3s ease;
	}
	textarea {
		resize: none;
		height: 100px;
	}

	.input_list {
		width: 100%;
		/* margin-bottom: 20px; */
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
		gap: 20px;
	}
	.twice {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 20px;
	}
	.item_wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
	}

	.subtitle {
		width: 100%;
		height: 40px;
		/* padding: 0 8px; */
		font-size: 16px;
		font-weight: 700;
		color: var(--color-black-100);
		display: flex;
		align-items: center;
		justify-content: start;
	}
	.input_wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.button_wrap {
		width: 100%;
		height: 50px;
		border-radius: 99px;
		color: var(--color-white);
		background: var(--color-blue-end);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.button_wrap button {
		width: 100%;
		height: 100%;
		border: none;
		font-size: 16px;;
		color: var(--color-white);
		background: var(--color-blue-end);
		border-radius: 99px;
		cursor: pointer;
	}
</style>