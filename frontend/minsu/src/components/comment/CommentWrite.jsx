import axios from "axios";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function CommentWrite(props) {
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const { postId } = useParams(); // 파라미터 가져오기

	const id = sessionStorage.getItem("id");

	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const chageContent = (event) => {
		setContent(event.target.value);
	}

	const createComment = async() => {

		const request = {
			content: content,
		}

		await axios.post(`${import.meta.env.VITE_REST_API}/post/${postId}/comment/write`, request, {headers: headers})
		.then((response) => {
			console.log("[CommentWrite.js] createComment() success :D");
			console.log(response.data);
			alert("댓글을 성공적으로 등록했습니다 :D");
			navigate(0);

		}).catch((err) => {
			console.log("[CommentWrite.js] createComment() error :<");
			console.log(err);

		});
	}

	return (
		<>
				{/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
				<div className="my-1 d-flex justify-content-center">


					<div className="col-7">
						<span className="comment-id" >{id}</span>
					</div>
					<div className="col-2 my-1 d-flex justify-content-end">
						<button className="btn btn-outline-secondary" onClick={createComment}><i className="fas fa-comment-dots"></i> 댓글 추가</button>
					</div>
				</div>
				{/* 하단 영역 (댓글 내용) */}
				<div className="my-3 d-flex justify-content-center">
					<textarea className="col-10" rows="1" value={content} onChange={chageContent}></textarea>
				</div><br/><br/>
		</>
	)
}

export default CommentWrite;