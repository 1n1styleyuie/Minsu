import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";

import "../../css/postlist.css";
import "../../css/page.css";

function PostList() {
  const [postList, setPostList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  // 게시글 전체 조회
  const getPostList = async (page) => {
    try {
		const response = await axios.get(`${import.meta.env.VITE_REST_API}/post/list`, {
			params: {"page": page - 1},
		  });

      console.log("[PostList.js] useEffect() success :D");
      console.log(response.data);

      setPostList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[PostList.js] useEffect() error :<");
      console.log(error);
    }
  };

  // 게시글 검색
  const search = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REST_API}/post/search`, {
        params: {
          page: page - 1,
          title: choiceVal === "title" ? searchVal : "",
          content: choiceVal === "content" ? searchVal : "",
          writerName: choiceVal === "writer" ? searchVal : "",
        },
      });

      console.log("[PostList.js searchBtn()] success :D");
      console.log(response.data);

      setPostList(response.data.content);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[PostList.js searchBtn()] error :<");
      console.log(error);
    }
  };

  // 첫 로딩 시, 한 페이지만 가져옴
  useEffect(() => {
    getPostList(1);
  }, []);

  // 검색 조건 저장
  const changeChoice = (event) => { setChoiceVal(event.target.value);};
  const changeSearch = (event) => { setSearchVal(event.target.value);};

  // 페이징 보여주기 
  const changePage = (page) => {
    setPage(page);
    getPostList(page);
  };

  return (
    <div className="postlist-content">
      {/* 검색 */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={changeChoice}
              >
                <option>옵션</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="검색어"
                value={searchVal}
                onChange={changeSearch}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={search}
              >
                <i className="fas fa-search"></i> 검색
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-1">번호</th>
            <th className="col-7">제목</th>
            <th className="col-3">작성자</th>
            <th className="col-1">조회수</th>
          </tr>
        </thead>

        <tbody>
          {postList.map(function (post, idx) {
            return <TableRow obj={post} key={idx} cnt={idx + 1} />;
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={totalPages}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />

      <div className="my-5 d-flex justify-content-end">
        <Link className="btn btn-outline-secondary" to="/postwrite">
          <i className="fas fa-pen"></i>글쓰기
        </Link>
      </div>
    </div>
  );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
  const post = props.obj;
  console.log(post)
  console.log(post.postId)
  return (
    <tr>
      <th>{props.cnt}</th>
      <td>
        <Link to={{ pathname: `/postdetail/${post.postId}` }}>
          <span className="underline bbs-title">{post.title}</span>
        </Link>
      </td>
      <td>{post.writerName}</td>
      <td style={{ textAlign: 'center' }}>{post.viewCount}</td>
    </tr>
  );
}


export default PostList;
