import React, { useEffect } from "react";
import Logo from "../assets/images/loadingLogo.png";
import styled from "styled-components";
import { primaryColor, secondaryColor } from "../styles/GlobalStyle";
import Title from "./../components/Title/Title";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.section`
  text-align: center;
`;
const Img = styled.img`
  width: auto;
  margin: 0 0 15rem 0;
`;

const SubTitle = styled.p`
  font-family: "Noto Sans KR Bold";
  font-size: 0.8rem;
  font-weight: 900;
  color: ${secondaryColor};
`;

const Bracket = styled.span`
  visibility: hidden;
`;

export default function LoadingToLoginForComment() {
  const navigate = useNavigate();
  const questionId = localStorage.getItem("questionId");
  const { id } = useParams();
  const loading = () => {
    setTimeout(() => {
      navigate(`/loginforcomment/${id}`);
    }, 1000);
  };
  useEffect(() => {
    //접속 시 페이지 랜더링
    axios
      .get(`http://127.0.0.1:8000/questions/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("questionId", response.data.id);
        localStorage.setItem("pageWriter", response.data.writer);
        localStorage.setItem("question", response.data.question);
      })
      .catch((error) => {
        if (error.response) {
          alert(1);
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          alert(2);
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          alert(3);
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    loading();
    return () => {
      clearTimeout(loading);
    };
  }, []);
  return (
    <>
      <Wrapper>
        <Img src={Logo} alt="error" />
        <Title />
        <SubTitle>
          나의 (<Bracket>빈칸</Bracket>), 당신의 ____
        </SubTitle>
      </Wrapper>
    </>
  );
}
