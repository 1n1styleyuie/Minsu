import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import "../../css/postwrite.css";

function PostWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // 추가: 파일 목록 상태 추가

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeFile = (event) => {
    // 총 5개까지만 허용
    const selectedFiles = Array.from(event.target.files).slice(0, 5);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /* 파일 업로드 */
  const fileUpload = async (postId) => {
	console.log("업로드할 파일 목록:", files);
    // 파일 데이터 저장
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    await axios
      .post(`${import.meta.env.VITE_REST_API}/post/${postId}/file/upload`, fd, { headers: headers })
      .then((response) => {
        console.log("[file.js] fileUpload() success :D");
        console.log(response.data);

        alert("파일 업로드 성공 :D");
      })
      .catch((err) => {
        console.log("[FileData.js] fileUpload() error :<");
        console.log(err);
      });
  };

  /* [POST /bbs]: 게시글 작성 */
  const createPost = async () => {
    const request = {
      title: title,
      content: content,
    };

    await axios
      .post(`${import.meta.env.VITE_REST_API}/post/write`, request, { headers: headers })
      .then((response) => {
        console.log("[BbsWrite.js] createBbs() success :D");
        console.log(response.data);
        const postId = response.data.postId;
        console.log("postId:", postId);
        fileUpload(postId);

        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/postdetail/${response.data.postId}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[BbsWrite.js] createBbs() error :<");
        console.log(headers)
        console.log(request)
        console.log(err);
      });
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);

  return (
    <div className="write-container">
      <table className="table">
        <tbody>
          <tr>
            <th className="table-light">작성자</th>
            <td>
              <input type="text" className="form-control" value={sessionStorage.getItem("id")} size="50px" readOnly />
            </td>
          </tr>

          <tr>
            <th className="table-light">제목</th>
            <td>
              <input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
            </td>
          </tr>

          <tr>
            <th className="table-light">내용</th>
            <td>
              <textarea className="form-control" value={content} onChange={changeContent} rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <th className="table-light">파일</th>
            <td>
              {files.map((file, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <p>
                    <strong>FileName:</strong> {file.name}
                  </p>
                  <button className="delete-button" type="button" onClick={() => handleRemoveFile(index)}>
                    x
                  </button>
                </div>
              ))}
              {files.length < 5 && (
                <div>
                  <input type="file" name="file" onChange={handleChangeFile} multiple="multiple" />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-5 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={createPost}>
          <i className="fas fa-pen"></i> 등록하기
        </button>
      </div>
    </div>
  );
}

export default PostWrite;
