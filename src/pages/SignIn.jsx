import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material/';
import PrimaryBtn from 'components/Button/PrimaryBtn';
import { primaryColor } from 'GlobalStyle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from 'context/AuthContext';
import { CursorText, Container, TitleBox } from 'components/ComponentStyled';
import { getCookie, setCookie } from '../Cookie';

const SignIn = () => {
  // State-------------------------------------------------------------------
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = getCookie('refresh_token');

  const goToHome = () => {
    navigate('/');
  };
  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate(`/mypage/${userId}`, { replace: true });
    }
  }, [refreshToken]);

  // Input 관리--------------------------------------------------------------
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
      .post('https://callmebyyourtext.xyz/login/login/', user)
      .then((response) => {
        console.log(response);
        setIsLoggedIn(true);
        localStorage.setItem('auth', true);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('access_token', response.data.access_token);
        setCookie('refresh_token', response.data.refresh_token);
        alert('로그인되었습니다.');
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
    navigate('/signup');
  };
  return (
    <>
      <Container>
        <TitleBox onClick={goToHome}></TitleBox>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          <TextField
            autoFocus
            required
            fullWidth
            variant="standard"
            color="info"
            type="email"
            id="email"
            name="email"
            label="이메일"
            onChange={onChange}
            sx={{ marginBottom: 1.5 }}
          />
          <TextField
            required
            fullWidth
            variant="standard"
            color="info"
            type="password"
            id="password"
            name="password"
            label="비밀번호"
            onChange={onChange}
          />
          <Typography
            color={primaryColor}
            sx={{
              fontSize: '12px',
              textAlign: 'right',
              marginTop: 1,
              marginBottom: 3,
            }}
          >
            <CursorText onClick={goToSignUp}>회원가입</CursorText>
          </Typography>
          <PrimaryBtn btnName={'Login'}></PrimaryBtn>
        </Box>
        <PrimaryBtn btnName={'Google'}></PrimaryBtn>
      </Container>
    </>
  );
};

export default SignIn;
