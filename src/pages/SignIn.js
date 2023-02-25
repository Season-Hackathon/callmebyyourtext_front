import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title/Title";
import { TextField, Box, Typography } from "@mui/material/";
import PrimaryBtn from "../components/Button/PrimaryBtn";
import { secondaryColor } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CursorText, Wrapper } from "../components/Styled";

const SignIn = () => {
  // State-------------------------------------------------------------------
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const userId = localStorage.getItem("id");
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    if (auth) {
      navigate(`/mypage/${userId}`, { replace: true });
    }
  }, [auth]);

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

  // 버튼 관리----------------------------------------------------------------
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
        console.log(response);
        setIsLoggedIn(true);
        localStorage.setItem("auth", true);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
        alert("로그인되었습니다.");
        navigate(`/mypage/${response.data.id}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 400 || 500) {
        //   alert("잘못된 정보입니다. 다시 시도해주세요.");
        // }
      });
  };
  const goToSignUp = () => {
    navigate("/signup");
  };
  return (
    <>
      <Wrapper>
        <Title />
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          <TextField
            autoFocus
            required
            fullWidth
            variant="standard"
            color="secondary"
            type="email"
            id="email"
            name="email"
            label="이메일"
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            variant="standard"
            color="secondary"
            type="password"
            id="password"
            name="password"
            label="비밀번호"
            onChange={onChange}
          />
          <Typography
            fontFamily="Noto Sans KR Black"
            color={secondaryColor}
            sx={{
              fontSize: "12px",
              textAlign: "right",
              marginTop: 1,
              marginBottom: 3,
            }}
          >
            <CursorText onClick={goToSignUp}>회원가입</CursorText>
          </Typography>
          <PrimaryBtn btnName={"Login"}></PrimaryBtn>
        </Box>
        <PrimaryBtn btnName={"Google"}></PrimaryBtn>
      </Wrapper>
    </>
  );
};

export default SignIn;
