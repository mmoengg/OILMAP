<script>
	import '$lib/styles/global.css';
	import { goto } from '$app/navigation';
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
					goto('/home', { replaceState: true });
				} else {
					throw new Error(data.error || 'GitHub 로그인 실패');
				}
			} catch (error) {
				alert('GitHub 로그인 실패: ' + error.message);
		}
	}

	const loginWithEmail = async () => {
		const email = document.querySelector('input[name="oil_email"]').value.trim();
		const password = document.querySelector('input[name="oil_password"]').value.trim();

		if (!email || !password) {
			alert('이메일과 비밀번호를 입력해주세요.');
			return;
		}

		const auth = getAuth();
		const user = auth.currentUser;
		
		const idToken = await user.getIdToken();
		
		// 서버 API로 idToken 전송
		const response = await fetch('/api/auth/email', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});
		
		const data = await response.json();
		
		if (data.success) {
			// 로그인 성공 후 홈으로 이동
			goto('/home', { replaceState: true });
		} else {
			throw new Error(data.error || 'email 로그인 실패');
		}
	};
</script>

<body>
	<section class="app_container">
		<div class="app_wrap">
			<div class="app_title">
				<h1>OilMap</h1>
				<span>유가 정보 파트너, 오일맵</span>
			</div>
			<div class="login_wrap">
				<ul class="email_login">
					<li>
						<input type="email" name="oil_email" placeholder="이메일"  autocomplete="off" />
					</li>
					<li>
						<input type="password" name="oil_password" placeholder="비밀번호" autocomplete="off" />
					</li>
					<li>
						<button type="button" on:click={loginWithEmail}>로그인</button>
					</li>
				</ul>
				<ul class="login_list">
					<li><p>소셜 로그인</p></li>
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
			max-width: 691px;
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
			color: var(--color-white);
			font-size: 48px;
		}
		.app_title span {
			color: var(--color-white);
			font-size: 16px;
		}

		.login_wrap {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 100px;
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
		}
		.login_list p {
			width: 100%;
			color: var(--color-white);
			font-size: 14px;
			text-align: center;
		}
		.login_list li button {
			width: 100%;
			height: 45px;
			font-size: 14px;
			border-radius: 12px;
			border: 1px solid var(--color-white);
			color: var(--color-white);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
		.login_list li button:hover{
			color: var(--color-white);
			border: 1px solid var(--color-blue-900);
			background-color: var(--color-blue-900);
			transition: 0.3s;
		}

		.copyright {
			position: fixed;
			bottom: 20px;
			width: 100%;
			color: var(--color-white);
			font-size: 12px;
			text-align: center;
		}

		.email_login {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 12px;
			margin-top: 20px;
		}
		.email_login li {
			width: 100%;
		}
		.email_login li input {
			width: 100%;
			height: 45px;
			padding: 0 12px;
			/* border-radius: 12px; */
			border-bottom: 1px solid var(--color-white);
			color: var(--color-white);
			background-color: transparent;
			/* background: var(--color-white); */
			font-size: 14px;
		}
		.email_login li input::placeholder {
			color: var(--color-white);
		}
		.email_login li input:focus {
			outline: none;
			background-color: transparent;
		}
		.email_login li button {
			width: 100%;
			height: 45px;
			border-radius: 12px;
			color: var(--color-blue-900);
			background-color: var(--color-white);
		}
		.email_login li button:hover{
			color: var(--color-white);
			border: 1px solid var(--color-blue-900);
			background-color: var(--color-blue-900);
			transition: 0.3s;
		}
  </style>