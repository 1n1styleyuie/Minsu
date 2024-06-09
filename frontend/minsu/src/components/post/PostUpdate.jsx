import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import "../../css/postupdate.css";

function PostUpdate() {
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const location = useLocation();
	const { post } = location.state;
	
	const postId = post.postId;
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [files, setFiles] = useState([]);
	const [severFiles, setSeverFiles ] = useState(post.files || []);

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	const handleChangeFile = (event) => {
		// 총 5개까지만 허용
		const selectedFiles = Array.from(event.target.files).slice(0, 5);
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
	};

	const handleRemoveFile = (index) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleRemoveSeverFile = (index, postId, fileId) => {
		setSeverFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
		fileDelete(postId, fileId);
	}

	useEffect(() => {
		setHeaders({
			"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
		});
	}, []);
	

	/* 파일 업로드 */
	const fileUpload = async (postId) => {
		console.log("업로드할 파일 목록:", files);
		// 파일 데이터 저장
		const fd = new FormData();
		files.forEach((file) => fd.append(`file`, file));

		await axios.post(`${import.meta.env.VITE_REST_API}/post/${postId}/file/upload`, fd, {headers: headers})
			.then((response) => {
				console.log("[file.js] fileUpload() success :D");
				console.log(response.data);
				alert("게시물과 파일을 성공적으로 수정했습니다. :D");
				
				// 새롭게 등록한 글 상세로 이동
				navigate(`/postdetail/${postId}`); 
			})
			.catch((err) => {
				console.log("[FileData.js] fileUpload() error :<");
				console.log(err);
			});
	};

	/* 파일 삭제 */
	const fileDelete = async (postId, fileId) => {
		try {
			await axios.delete(`${import.meta.env.VITE_REST_API}/board/${postId}/file/delete?fileId=${fileId}`, {headers: headers});
				console.log("[BbsUpdate.js] fileDelete() success :D");
				alert("파일 삭제 성공 :D");
		} catch (error) {
			console.error("[BbsUpdate.js] fileDelete() error :<");
			console.error(error);
		}
	};

	/* 게시판 수정 */
	const updatePost = async () => {

		const request = {
			id: auth, 
			title: title, 
			content: content
		}

		await axios.patch(`${import.meta.env.VITE_REST_API}/post/${post.postId}/update`, request, {headers: headers})
		.then((response) => {
			console.log("[BbsUpdate.js] updateBbs() success :D");
			console.log(response.data);
			const postId = response.data.postId;

			if (files.length > 0) {
				fileUpload(postId);
			} else {
				alert("게시글을 성공적으로 수정했습니다 :D");
				navigate(`/postdetail/${response.data.postId}`); // 새롭게 등록한 글 상세로 이동
			}
		})
		.catch((err) => {
			console.log("[BbsUpdate.js] updateBbs() error :<");
			console.log(err);
		});

	}


	return (
		<div className="update-container">
			<table className="table">
				<tbody>
					<tr>
						<th className="table-light">작성자</th>
						<td>
							<input type="text" className="form-control"  value={post.writerName} size="50px" readOnly />
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
							<textarea className="form-control" value={content} onChange={changeContent} rows="10" ></textarea>
						</td>
					</tr>
					<tr>
					<th className="table-light">파일</th>
					<td>
					{severFiles.length > 0 || files.length > 0 ? (
						<div className='file-box'>
							<ul>
								{/* 기존의 파일 데이터, 삭제 로직 */}
								{severFiles.map((file, index) => (
									<li key={file.fileId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<span>
											<strong>File Name:</strong> {file.originFileName} &nbsp;
											<button className="delete-button" type="button" onClick={() => handleRemoveSeverFile(index, postId, file.fileId)}>
												x
											</button>
										</span>
									</li>
								))}
								{/* 새로운 파일을 저장할 때 */}
								{files.map((file, index) => (
									<li key={file.fileId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<span>
										<strong>File Name:</strong> {file.name} &nbsp;
										<button className="delete-button" type="button" onClick={() => handleRemoveFile(index)}>
											x
										</button>
									</span>
								</li>
								))}
							</ul>
						</div>
					) : (
						<div className='file-box'>
							<p>No files</p>
						</div>
					)}
					<div className='file-select-box'>
							<input type='file' name='file' onChange={handleChangeFile} multiple="multiple" />
					</div>
					</td>
				</tr>
				</tbody>
			</table>

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-dark" onClick={updatePost}><i className="fas fa-pen"></i> 수정하기</button>
			</div>
		</div>
	);

}

export default PostUpdate;