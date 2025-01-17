/* 회원 정보 수정 컴포넌트 */
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function UserUpdate(props) {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");

  const email = props.email;

	const navigate = useNavigate();

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

	useEffect(() => {
			setHeaders({
					"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
			});
			setName(props.name);
	}, [props.name]);

	/* 회원 정보 수정 */
	const update = async () => {

		const request = {
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
		}

		await axios.post(`${import.meta.env.VITE_REST_API}/user/update`, request, {headers: headers})
			.then((response) => {
				console.log("[MemberUpdate.js] update() success :D");
				console.log(response.data);

				alert(response.data.username + "님의 회원 정보를 수정했습니다");
				navigate("/");

			}).catch((err) => {
				console.log("[MemberUpdate.js] update() error :<");
				console.log(err);

				const response = err.response;
				if (response.status === 400) {
					alert(response.data);
				}
			});
	}

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th>이메일</th>
						<td>
							<input type="text" className="form-control"  value={email} size="50px" readOnly />
						</td>
					</tr>

					<tr>
						<th>이름</th>
						<td>
							<input type="text" value={name} onChange={changeName} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={pwd} onChange={changePwd} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호 확인</th>
						<td>
							<input type="password" value={checkPwd} onChange={changeCheckPwd} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={update}><i className="fas fa-user-plus"></i>정보 수정</button>
			</div>

		</div>
	);
}

export default UserUpdate;
