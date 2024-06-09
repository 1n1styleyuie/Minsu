import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Download from '../download/Download'

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark sticky-top">
        <div className="container">
          <div
            className="navbar-collapse collapse d-flex align-items-end flex-column"
            id="navbar-content"
          >
            {/* <ul className="navbar-nav mr-auto">
              <li>
                <Download />
              </li>
            </ul> */}
            <ul className="navbar-nav ml-auto">
              {/* 메인 화면 */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              

              {/* 게시판 */}
              <li className="nav-item">
                  <Link className="nav-link" to="/postlist">
                    <i className="fas fa-home"></i>자유게시판
                  </Link>
              </li>
              {auth ? (
                <>
                  {/* 회원 정보 */}
                  <li className="nav-item">
                      <Link className="nav-link">
                        <i className="fas fa-sign-out-alt"></i> {auth} 님 반갑습니다
                      </Link>
                  </li>

                  {/* 로그아웃 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      <i className="fas fa-sign-out-alt"></i> 로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* 로그인 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      로그인
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <Download />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
