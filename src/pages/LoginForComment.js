import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import InputId from "../assets/images/inputId.png";
import InputPw from "../assets/images/inputPw.png";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Box, Typography } from "@mui/material/";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import PrimaryBtn from "../components/Button/PrimaryBtn";
import "../styles/LoginForComment.css";
import { pointColor, primaryColor } from "../styles/GlobalStyle";

const Wrapper = styled.section`
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BtnWrapper = styled.section`
  text-align: center;
`;

const TextFieldWrap = styled.div`
  text-align: center;
  display: flex;
  border-bottom: 1px solid ${primaryColor};
`;

const Img = styled.img`
  width: auto;
  object-fit: contain;
  margin-right: 0.5rem;
`;

export default function LoginForComment() {
  // State-------------------------------------------------------------------
  const navigate = useNavigate();
  const questionId = localStorage.getItem("questionId");
  const [pageWriter, setPageWriter] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    setPageWriter(localStorage.getItem("pageWriter"));
    if (isLoggedIn) {
      navigate(`/forentercomment/${questionId}`, { replace: true });
    }
  }, [isLoggedIn]);

  // Input 관리--------------------------------------------------------------
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  // 로그인 버튼 눌렀을 때 데이터 전송
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    const user = {
      email,
      password,
    };
    await axios
      .post("http://127.0.0.1:8000/login/login/", user)
      .then((response) => {
        setIsLoggedIn(true);
        localStorage.setItem("auth", true);
        localStorage.setItem("token", response.data.token);
        alert("로그인되었습니다.");
        //  navigate(`/forentercomment/${questionId}`, { replace: true });
      })
      .catch((error) => {
        alert(error);
        if (error.response.status === 400) {
          alert("잘못된 정보입니다. 다시 시도해주세요.");
        }
      });
  };

  // 익명으로 진행-----------------
  const handleClickToAnony = () => {
    navigate(`/forentercomment/${questionId}`);
  };

  return (
    <>
      <Wrapper>
        <Header user={pageWriter} />
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          <TextFieldWrap
            style={{
              "margin-top": "3rem",
              width: "90%",
              display: "flex",
            }}
          >
            <Img src={InputId} />
            <TextField
              disableUnderline={true}
              autoFocus
              required
              fullWidth
              color="secondary"
              type="email"
              id="email"
              name="email"
              label="E-mail"
              onChange={onChange}
            />
          </TextFieldWrap>
          <TextFieldWrap
            style={{ "margin-top": "1rem", width: "90%", display: "flex" }}
          >
            <Img src={InputPw} />
            <TextField
              required
              fullWidth
              color="secondary"
              type="password"
              id="password"
              name="password"
              label="password"
              onChange={onChange}
            />
          </TextFieldWrap>

          <BtnWrapper style={{ marginTop: "3rem" }}>
            <PrimaryBtn btnName={"로그인"}></PrimaryBtn>
          </BtnWrapper>
        </Box>
        <BtnWrapper style={{ marginTop: "1rem", marginBottom: "3rem" }}>
          <PrimaryBtn
            btnName={"그냥하기"}
            onClick={handleClickToAnony}
          ></PrimaryBtn>
        </BtnWrapper>
      </Wrapper>
    </>
  );
}
