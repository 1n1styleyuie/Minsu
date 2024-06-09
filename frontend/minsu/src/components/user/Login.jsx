/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";


import '../../css/login.css'

function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	function registerClick() {
		navigate('/register')
	}

	const [id, setId] = useState("");
	const [pwd, setPwd] = useState("");

	const changeId = (event) => {
		setId(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const login = async () => {

		const request = {
			email: id,
			password: pwd
		}

		await axios.post(`${import.meta.env.VITE_REST_API}/user/login`, request)
		.then((response) => {
			console.log("[Login.js] login() success :D");
			console.log(response.data);

				// alert(response.data.email + "님, 성공적으로 로그인 되었습니다 🔐");

				// JWT 토큰 저장
				sessionStorage.setItem("accessToken", response.data.token);
				sessionStorage.setItem("id", response.data.email);

				setAuth(response.data.email); // 사용자 인증 정보(아이디 저장)
				setHeaders({"Authorization": `Bearer ${response.data.token}`}); // 헤더 Authorization 필드 저장

				navigate("/");
			

		}).catch((err) => {
			console.log("[Login.js] login() error :<");
			console.log(err);

			alert("⚠️ " + err.response.data);
		});
	}

	return (
		<div className="login-container">

			<input type="text" value={id} onChange={changeId} size="50px" placeholder="ID" />

			<input type="password" value={pwd} onChange={changePwd} size="50px" placeholder="Password" />

			<div className="my-1 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={registerClick}><i className="fas fa-sign-in-alt"></i>회원가입</button>
				<button className="btn btn-outline-secondary" onClick={login}><i className="fas fa-sign-in-alt"></i> 로그인</button>
			</div>

		</div>
	);
}

export default Login;