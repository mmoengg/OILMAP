<script>
	import { goto } from '$app/navigation';
</script>

<body>
	<div class="app-container">
	  <main class="main-content">
		<section class="card">
		  <div class="card-image-container">
			<img src="/images/icon/icon_main.png" alt="OilMap Banner" class="card-image" />
		  </div>
		  <div class="card-body">
			<h1 class="card-title">오일맵</h1>
			<p class="card-desc">유가 정보 파트너</p>
			<button class="explore-btn" on:click={() => goto('/home')}>살펴보기</button>
		  </div>
		</section>
	  </main>
	</div>
  </body>
  
  <style>
		body {
			margin: 0;
			padding: 0;
			background: #222;
		}

		.app-container {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.main-content {
			width: 100%;
			max-width: 430px;
			min-height: calc(100vh - 48px);
			background: #222;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			box-sizing: border-box;
		}

		.card {
			background: #fff;
			border-radius: 32px;
			box-shadow: 0 0 24px 0 rgba(0,0,0,0.15);
			width: 90%;
			max-width: 360px;
			padding: 32px 24px 24px 24px;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
		}

		.card-image-container {
			position: relative;
			width: 120px;
			height: 120px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.card-image {
			width: 100%;
			height: 100%;
			border-radius: 999px;
			object-fit: contain;
			filter: brightness(0.95);
		}

		.card-title {
			font-size: 2rem;
			font-weight: bold;
			margin: 16px 0 12px 0 ;
			color: #222;
			text-align: center;
		}

		.card-desc {
			font-size: 1.1rem;
			color: #666;
			text-align: center;
			margin-bottom: 28px;
		}

		.explore-btn {
			width: 180px;
			background: #ff9800;
			color: #fff;
			border: none;
			border-radius: 12px;
			padding: 14px 0;
			font-size: 1.1rem;
			font-weight: bold;
			cursor: pointer;
			box-shadow: 0 2px 8px rgba(255,152,0,0.12);
			transition: background 0.2s;
		}
		.explore-btn:hover {
			background: #e68900;
		}

	@media (max-width: 480px) {
		.card {
			padding: 24px 8px 16px 8px;
			max-width: 98vw;
		}
	}
  </style>