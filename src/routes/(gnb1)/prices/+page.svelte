<script>
	let today = '2025-05-03';
	let prices = [
		{
			type: '휘발유',
			price: 1760,
			change: -12,
			color: '#ff9800'
		},
		{
			type: '경유',
			price: 1560,
			change: -8,
			color: '#4caf50'
		},
		{
			type: '고급휘발유',
			price: 1970,
			change: -10,
			color: '#2196f3'
		}
		];

	let history = [
		{ date: '2025-05-02', 휘발유: 1772, 경유: 1568, 고급휘발유: 1980 },
		{ date: '2025-05-01', 휘발유: 1780, 경유: 1575, 고급휘발유: 1992 }
	];
  </script>
  
<section class="prices-container">
	<h1 class="page-title">오늘의 전국 평균 시세</h1>
	<div class="today-prices">
		{#each prices as price}
		<div class="price-card" style="--main-color: {price.color}">
			<span class="type">{price.type}</span>
			<span class="value">{price.price.toLocaleString()}원</span>
			<span class="change" class:minus={price.change < 0}>
			{price.change > 0 ? `+${price.change}` : price.change}원
			</span>
		</div>
		{/each}
	</div>

	<h2 class="history-title">최근 시세 변동</h2>
	<table class="history-table">
		<thead>
		<tr>
			<th>날짜</th>
			<th>휘발유</th>
			<th>경유</th>
			<th>고급휘발유</th>
		</tr>
		</thead>
		<tbody>
		{#each history as row}
			<tr>
			<td>{row.date}</td>
			<td>{row.휘발유.toLocaleString()}원</td>
			<td>{row.경유.toLocaleString()}원</td>
			<td>{row.고급휘발유.toLocaleString()}원</td>
			</tr>
		{/each}
		</tbody>
	</table>
</section>
  
<style>
	.prices-container {
		max-width: 430px;
		margin: 0 auto;
		padding: 32px 16px 24px 16px;
	}
	.page-title {
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 18px;
		color: #222;
		text-align: center;
	}
	.today-prices {
		display: flex;
		gap: 14px;
		justify-content: center;
		margin-bottom: 32px;
	}
	.price-card {
		background: #fff;
		border-radius: 18px;
		box-shadow: 0 2px 12px rgba(0,0,0,0.07);
		padding: 18px 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 90px;
		border-top: 4px solid var(--main-color);
	}
	.type {
		font-size: 1.1rem;
		color: var(--main-color);
		font-weight: 600;
		margin-bottom: 6px;
	}
	.value {
		font-size: 1.3rem;
		font-weight: bold;
		margin-bottom: 4px;
		color: #222;
	}
	.change {
		font-size: 1rem;
		color: #ff9800;
	}
	.change.minus {
		color: #2196f3;
	}
	.history-title {
		font-size: 1.15rem;
		font-weight: 600;
		margin: 30px 0 12px 0;
		color: #222;
	}
	.history-table {
		width: 100%;
		border-collapse: collapse;
		background: #fff;
		border-radius: 14px;
		overflow: hidden;
		box-shadow: 0 1px 8px rgba(0,0,0,0.04);
	}
	.history-table th, .history-table td {
		padding: 10px 6px;
		text-align: center;
		font-size: 1rem;
	}
	.history-table th {
		background: #f7f7f7;
		font-weight: 600;
		color: #666;
	}
	.history-table tr:not(:last-child) td {
		border-bottom: 1px solid #eee;
	}
</style>
  