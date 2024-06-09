import React from "react";
import { Link } from "react-router-dom";
import '../../css/home.css';

function Home() {
    return (
        <div className="container mt-5">
            <p className="title-text">민수의 문화유산 탐방기</p>
            <img src="src/assets/key.png" alt="" />
        </div>
    );
}

export default Home;