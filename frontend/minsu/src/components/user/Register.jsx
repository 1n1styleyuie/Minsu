/* 회원가입 컴포넌트 */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import '../../css/register.css'

function Register() {

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");

	const navigate = useNavigate();

	const changeEmail = (event) => {
		setEmail(event.target.value);
	}

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

	/* 아이디 중복 체크 */
	const checkEmailDuplicate = async () => {

		await axios.get(`${import.meta.env.VITE_REST_API}/user/checkId`, { params: { email: email } })
			.then((response) => {
				console.log("[Register.js] checkEmailDuplicate() success :D");
				console.log(response.data);

				if (response.status === 200) {
					alert("사용 가능한 이메일입니다.");
				}
			})
			.catch((err) => {
				console.log("[Register.js] checkEmailDuplicate() error :<");
				console.log(err);

				const response = err.response;
				if (response.status === 400) {
					alert(response.data);
				}
			});

	}

	/* 회원가입 */
	const register = async () => {

		const request = {
			email: email,
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
		}

		await axios.post(`${import.meta.env.VITE_REST_API}/user/register`, request)
			.then((response) => {
				console.log("[Register.js] Register() success :D");
				console.log(response.data);

				alert(response.data.username + "님 회원가입을 축하드립니다 🎊");
				navigate("/login");

			}).catch((err) => {
				console.log("[Register.js] Register() error :<");
				console.log(err);

				const response = err.response;
				if (response.status === 400) {
					alert(response.data);
				}
			});
	}

	return (
		<div className="register">
			<div className="register-container">
				<div className="register-input">
					<p>이메일</p>
					<input type="email" value={email} onChange={changeEmail} size="50px" /> &nbsp; &nbsp;
					<button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
						<i className="fas fa-check"></i> 이메일 중복 확인</button>
				</div>

				<div className="register-input">
					<p>이름</p>
					<input type="text" value={name} onChange={changeName} size="50px" />
				</div>

				<div className="register-input">
					<p>비밀번호</p>
					<input type="password" value={pwd} onChange={changePwd} size="50px" />
				</div>

				<div className="register-input">
					<p>비밀번호 확인</p>
					<input type="password" value={checkPwd} onChange={changeCheckPwd} size="50px" />
				</div>


				<div className="my-3 d-flex justify-content-center">
					<button className="btn btn-outline-secondary" onClick={register}><i className="fas fa-user-plus"></i> 회원가입</button>
				</div>

			</div>
		</div>
	);
}

export default Register;
