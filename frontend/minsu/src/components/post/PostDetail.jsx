import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import "../../css/postdetail.css"; // 추가: 스타일 파일 import
import FileDisplay from "../file/FileDisplay";

function PostDetail() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [ post, setPost] = useState({});
  const { postId } = useParams(); // 파라미터 가져오기
  const navigate = useNavigate();

	console.log(postId)

  const getPostDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REST_API}/post/${postId}`);

      console.log("[BbsDetail.js] getBbsDetail() success :D");
      console.log(response.data);

      setPost(response.data);
    } catch (error) {
      console.log("[BbsDetail.js] getBbsDetail() error :<");
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REST_API}/post/${postId}/delete`, {headers: headers});

      console.log("[BbsDetail.js] deleteBbs() success :D");
      console.log(response.data);

      if (response.status == 200) {
        alert("게시글을 성공적으로 삭제했습니다 :D");
        navigate("/postlist");
      }
    } catch (error) {
      console.log("[BbsDetail.js] deleteBbs() error :<");
      console.error(error);
    }
  };

  useEffect(() => {
	// 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
	setHeaders({
		"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
	});
    getPostDetail();
  }, []);

  const updatePost = {
    postId: post.postId,
    writerName: post.writerName,
    title: post.title,
    content: post.content,
	files: post.files
  };

  const parentPost = {
    postId: post.postId,
    title: post.title,
  };

	return (
		<div className="bbs-detail-container">
			<div>

				<div className="my-3 d-flex justify-content-end">
					<Link className="btn btn-outline-secondary" to="/postlist"><i className="fas fa-list">
						</i> 글목록</Link> &nbsp;

					<Link className="btn btn-outline-secondary" to={{pathname: `/postanswer/${post.postId}` }} state={{ parentPost: parentPost }}>
						<i className="fas fa-pen"></i> 답글쓰기</Link> &nbsp;

				{
					/* 자신이 작성한 게시글인 경우에만 수정, 삭제 가능 */
					(sessionStorage.getItem("id") == post.writerName) ?
						<>
							<Link className="btn btn-outline-secondary"  to="/postupdate" state={{ post: updatePost }}><i className="fas fa-edit"></i> 수정</Link> &nbsp;
							<button className="btn btn-outline-danger"  onClick={deletePost}><i className="fas fa-trash-alt"></i> 삭제</button>
						</>
					:
					null
				}

				</div>

				<table className="table table-striped">
				<tbody>
				<tr>
					<th className="col-3">작성자</th>
					<td>
					<span>{post.writerName}</span>
					</td>
				</tr>

				<tr>
					<th>제목</th>
					<td>
					<span>{post.title}</span>
					</td>
				</tr>

				<tr>
					<th>작성일</th>
					<td>
					<span>{post.createdDate}</span>
					</td>
				</tr>

				<tr>
					<th>조회수</th>
					<td>
					<span>{post.viewCount}</span>
					</td>
				</tr>

				<tr>
					<th>내용</th>
					<td>
          <span>{post.content}</span>
          </td>
				</tr>
				</tbody>
				</table>

				<div className="content-box">{post.content}</div>
				<div>
					<FileDisplay files={post.files} postId={postId} />
				</div>
				
				 {/* 댓글 리스트 컴포넌트 */}
				 <CommentList postId={postId} />

				{/* 댓글 작성 컴포넌트 */}
				{
					(auth) ? // 로그인한 사용자만 댓글 작성 가능
						<CommentWrite postId={postId}/>
					:
						null
				}


			</div>
		</div>
	);
}

export default PostDetail;