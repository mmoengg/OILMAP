<script>
	import Header from '$lib/components/common/Header.svelte';
	import { fly } from 'svelte/transition';
	import { addHistory, editHistory, deleteHistory } from "$lib/store/history/historyStore.js";
	import { v4 as uuidv4 } from 'uuid';

	export let user = {};
	export let title = '';
	export let showForm = false;
	export let loadList = () => {};
	export let formData;

	const handleInsertClick =  async() => {
		if (!formData.stationName || !formData.date || !formData.amount || !formData.stationPrice || !formData.stationLiter) {
			alert('모든 필드를 입력해주세요.');
			return;
		}
		if (isNaN(formData.stationPrice) || isNaN(formData.amount) || isNaN(formData.stationLiter) || isNaN(formData.cleaningCost)) {
			alert('가격과 용량은 숫자로 입력해주세요.');
			return;
		}
		if (formData.stationOil === '경유' && formData.stationPrice < 1000) {
			alert('경유 단가는 1000원 이상이어야 합니다.');
			return;
		}
		if (formData.stationOil === '휘발유' && formData.stationPrice < 1000) {
			alert('휘발유 단가는 1000원 이상이어야 합니다.');
			return;
		}
		if (formData.stationOil === 'LPG' && formData.stationPrice < 500) {
			alert('LPG 단가는 500원 이상이어야 합니다.');
			return;
		}
		if (formData.stationLiter <= 0) {
			alert('주유량은 0보다 커야 합니다.');
			return;
		}
		if (formData.amount <= 0) {
			alert('주유 금액은 0보다 커야 합니다.');
			return;
		}
		if (formData.cleaningCost < 0) {
			alert('세차비는 0 이상이어야 합니다.');
			return;
		}
		if (formData.memo.length > 200) {
			alert('메모는 200자 이하로 입력해주세요.');
			return;
		}

		if (title === '신규 주유 기록') {
			try {
				await addHistory(user.uid, {
					id: uuidv4(),
					date: formData.date,
					amount: formData.amount,
					station_liter: formData.stationLiter,
					station_name: formData.stationName,
					station_oil: formData.stationOil,
					station_poll: '',
					station_price: formData.stationPrice,
					cleaning_cost: formData.cleaningCost,
					memo: formData.memo
				});
				alert('주유 기록이 저장되었습니다!');
				loadList(); // 목록 새로고침
				showForm = false; // 폼 닫기
			} catch (e) {
				alert('저장 실패: ' + e.message);
			}
		} else {
			try {
				await editHistory(user.uid, formData.id, {
					date: formData.date,
					amount: formData.amount,
					station_liter: formData.stationLiter,
					station_name: formData.stationName,
					station_oil: formData.stationOil,
					station_poll: '',
					station_price: formData.stationPrice,
					cleaning_cost: formData.cleaningCost,
					memo: formData.memo
				});
				alert('주유 기록이 수정되었습니다!');
				loadList(); // 목록 새로고침
				showForm = false; // 폼 닫기
			} catch (e) {
				alert('수정 실패: ' + e.message);
			}
		}
	};

	const handleDeleteClick = async () => {
		if (!formData.id) {
			alert('삭제할 기록을 선택해주세요.');
			return;
		}
		if (confirm('정말로 이 기록을 삭제하시겠습니까?')) {
			try {
				await deleteHistory(user.uid, formData.id);
				alert('주유 기록이 삭제되었습니다!');
				loadList(); // 목록 새로고침
				showForm = false; // 폼 닫기
			} catch (e) {
				alert('삭제 실패: ' + e.message);
			}
		}
	};
</script>

<div class="popup_container">
	<div class="popup_wrap" in:fly={{ y: 200, duration: 600 }}
	out:fly={{ y: 200, duration: 600 }}>
		<Header title={title} back={true} callFn={() => showForm = !showForm} />
		<div class="content_wrap">
<!--			<h1 class="station_name">-->
<!--				<input type="text" value="">-->
<!--			</h1>-->
			<ul class="input_list">
				<li>
					<div class="subtitle">주유소명</div>
					<div class="input_wrap">
						<input type="text" bind:value={formData.stationName}/>
					</div>
				</li>
				<li>
					<div class="subtitle">날짜</div>
					<div class="input_wrap">
						<input type="text" bind:value={formData.date}/>
					</div>
				</li>
				<li>
					<div class="subtitle">단가</div>
					<div class="input_wrap">
						<input type="number" bind:value={formData.stationPrice} />
					</div>
				</li>
				<li class="twice">
					<div class="item_wrap">
						<div class="subtitle">유종</div>
							<div class="input_wrap">
								<select bind:value={formData.stationOil}>
									<option value="경유">경유</option>
									<option value="휘발유">휘발유</option>
									<option value="LPG">LPG</option>
								</select>
							</div>
						</div>
					<div class="item_wrap">
						<div class="subtitle">주유량</div>
						<div class="input_wrap">
							<input type="number" bind:value={formData.stationLiter}/>
						</div>
					</div>
				</li>
				<li>
					<div class="subtitle">주유 금액</div>
					<div class="input_wrap">
						<input type="number" bind:value={formData.amount} />
					</div>
				</li>
				<li>
					<div class="subtitle">세차비</div>
					<div class="input_wrap">
						<input type="number" bind:value={formData.cleaningCost} />
					</div>
				</li>
				<li>
					<div class="subtitle">메모</div>
					<div class="">
						<textarea bind:value={formData.memo} placeholder="최대 200자" />
					</div>
				</li>
			</ul>
			<div class="button_wrap">
					<button type="button" on:click={handleInsertClick}>저장</button>
					<button type="button" class="error" on:click={handleDeleteClick}>삭제</button>
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
		overflow-y: auto;
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;
		gap: 10px;
	}
	.popup_container::-webkit-scrollbar,
	.popup_wrap::-webkit-scrollbar {
		display: none;
	}

	.content_wrap {
		width: 100%;
		/*height: 100%;*/
		padding: 24px;
		border-top: 1px solid var(--color-black-10);
		background: var(--color-white);
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: column;
		gap: 40px;
	}

	/*.station_name {*/
	/*	width: 100%;*/
	/*	height: 40px;*/
	/*	font-size: 24px;*/
	/*	font-weight: 700;*/
	/*	color: var(--color-black-100);*/
	/*	display: flex;*/
	/*	align-items: center;*/
	/*	justify-content: start;*/
	/*}*/

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
		color: #000;
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
		border-radius: 99px;
		color: var(--color-white);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 15px;
	}
	.button_wrap button {
		width: 100%;
		height: 100%;
		min-height: 50px;
		border: none;
		font-size: 16px;;
		color: var(--color-white);
		background: var(--color-blue-end);
		border-radius: 99px;
		cursor: pointer;
	}
	.button_wrap button.error {
		color: #de6f6f;
		border: 1px solid #de6f6f;
		background-color: #fff;
	}

</style>