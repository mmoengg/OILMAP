<script>
	import '$lib/styles/global.css';
	import { goto } from '$app/navigation';
	import { auth, githubProvider } from '$lib/firebase/firebase.ts';
	import { signInWithPopup } from 'firebase/auth';

	const loginWithGitHub = async () => {
    	try {
				// Firebase 클라이언트로 GitHub 로그인
				const result = await signInWithPopup(auth, githubProvider);
				
				// idToken 획득
				const idToken = await result.user.getIdToken();
				
				// 서버 API로 idToken 전송
				const response = await fetch('/api/auth/github', {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json'
					},
					body: JSON.stringify({ idToken })
				});
				
				const data = await response.json();
				
				if (data.success) {
					// 로그인 성공 후 홈으로 이동
					goto('/home');
				} else {
					throw new Error(data.error || 'GitHub 로그인 실패');
				}
			} catch (error) {
				alert('GitHub 로그인 실패: ' + error.message);
		}
	}
</script>

<body>
	<section class="app_container">
		<div class="app_wrap">
			<div class="app_title">
				<h1>OilMap</h1>
				<span>유가 정보 파트너, 오일맵</span>
			</div>
			<div class="login_wrap">
				<ul class="login_list">
					<!-- <li>
						<button type="button">Google</button>
					</li>
					<li>
						<button type="button">KakaoTalk</button>
					</li> -->
					<li>
						<button type="button" on:click={loginWithGitHub}>GitHub</button>
					</li>
				</ul>
			</div>
			<div class="copyright">© mmoengg</div>
		</div>
	</section>
</body>
  
  <style>
		.app_container  {
			width: 100vw;
			height: 100vh;
			background: var(--color-text);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 20px;
		}
		.app_wrap {
			width: 100%;
			height: 100%;
			max-width: 430px;
			margin: 0 auto;
			padding: 20px;
			background: var(--color-main-gr);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 20px;
		}

		.app_title {
			width: 100%;
			margin-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 20px;
		}
		.app_title h1 {
			color: var(--color-surface);
			font-size: 48px;
		}
		.app_title span {
			color: var(--color-surface);
			font-size: 16px;
		}

		.login_wrap {
			width: 100%;
		}
		.login_list {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 12px;
		}
		.login_list li {
			width: 100%;
			height: 45px;
		}
		.login_list li button {
			width: 100%;
			height: 100%;
			color: var(--color-blue-900);
			font-size: 12px;
			border-radius: 12px;
			background: var(--color-surface);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
		.login_list li button:hover{
			color: var(--color-surface);
			border: 1px solid var(--color-surface);
			background: transparent;
			transition: 0.3s;
		}

		.copyright {
			position: fixed;
			bottom: 20px;
			width: 100%;
			color: var(--color-surface);
			font-size: 12px;
			text-align: center;
		}
  </style>