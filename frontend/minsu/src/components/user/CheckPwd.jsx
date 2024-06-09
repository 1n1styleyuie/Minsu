import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import UserUpdate from "./UserUpdate";

function CheckPwd() {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [showUserUpdate, setShowUserUpdate] = useState(false);

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changePwd = (event) => {
        setPwd(event.target.value);
    }

    useEffect(() => {
        // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
        setHeaders({
            "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
        });
      }, []);

    const passwordCheck = async () => {
        const req = {
            password: pwd
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REST_API}/user/checkPwd`, req, { headers: headers });
            console.log("[UserUpdate.jsx] checkPwd() success :D");
            console.log(response.data);
            setEmail(response.data.email);
            setName(response.data.username);

            setShowUserUpdate(true);
        } catch (err) {
            console.log("[UserrUpdate.js] checkPwd() error :<");
            console.log(err);

            const response = err.response;
            if (response.status === 400) {
                alert(response.data);
            }
        }
    }

    return (
        <div>
            {showUserUpdate ? (
                <UserUpdate email={email} name={name} />
            ) : (
                <>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <input type="password" value={pwd} onChange={changePwd} size="50px" />
                                </td>
                            </tr>
                        </tbody>
                    </table><br />

                    <div className="my-3 d-flex justify-content-center">
                        <button className="btn btn-outline-secondary" onClick={passwordCheck}>
                            <i className="fas fa-user-plus"></i>비밀번호 확인
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CheckPwd;