import React, { useContext, useEffect, useState } from 'react';
import { TextField, Box, Typography } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from 'context/AuthContext';
import {
  CursorText,
  Container,
  TitleBox,
  MainButton,
  FormHelperEmails,
  FormHelperPWs,
} from 'components/ComponentStyled';
import { getCookie, setCookie } from '../Cookie';
import GoogleButton from 'components/Button/GoogleButton';

const SignIn = () => {
  // State-------------------------------------------------------------------
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = getCookie('refresh_token');

  // Input 관리------------------------------------------------------
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // Navigation------------------------------------------------------
  const goToSignUp = () => navigate('/signup');
  const goToHome = () => navigate('/');

  // 렌더링 시 실행---------------------------------------------------
  useEffect(() => {
    if (accessToken && refreshToken && userId) {
      navigate(`/mypage/${userId}`, { replace: true });
    }
  }, [refreshToken]);

  // Form 관리-------------------------------------------------------
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 클릭------------------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    const user = {
      email,
      password,
    };
    if (email === '') {
      setIsEmail(false);
      setEmailMessage('이메일 입력란을 작성하세요.');
    } else {
      setIsEmail(true);
      await axios
        .post('https://callmebyyourtext.xyz/login/login/', user)
        .then((response) => {
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
          if (error.response.status === 500) {
            setIsEmail(false);
            setEmailMessage(
              '등록되지 않은 계정입니다. 회원가입 후 시도해주세요.'
            );
          } else if (error.response.status === 401) {
            setIsPassword(false);
            setEmailMessage('');
            setPasswordMessage(
              '비밀번호가 올바르지 않습니다. 다시 시도해주세요.'
            );
          } else {
            setIsEmail(false);
            setIsPassword(false);
            setEmailMessage(
              '일시적인 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.'
            );
          }
        });
    }
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
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 2,
            width: '350px;',
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
          />
          <FormHelperEmails isemail={isEmail ? 'true' : 'false'}>
            {emailMessage}
          </FormHelperEmails>
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
            sx={{ marginTop: 3 }}
          />
          <FormHelperPWs ispassword={isPassword ? 'true' : 'false'}>
            {passwordMessage}
          </FormHelperPWs>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <CursorText onClick={goToSignUp}>회원가입</CursorText>
          </Typography>
          <MainButton type="submit">Login</MainButton>
        </Box>
        <GoogleButton />
      </Container>
    </>
  );
};

export default SignIn;
