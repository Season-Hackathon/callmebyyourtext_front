import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material/';
import styled from 'styled-components';
import { errorColor, primaryColor } from 'GlobalStyle';
import PrimaryBtn from 'components/Button/PrimaryBtn';
import axios from 'axios';
import { Container, TitleBox } from 'components/ComponentStyled';

// FormHelper--------------------------------------------------------------------------
const FormHelperEmails = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.isemail === 'true' ? `${primaryColor}` : `${errorColor}`} !important;
`;
const FormHelperNames = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.isname === 'true' ? `${primaryColor}` : `${errorColor}`} !important;
`;
const FormHelperPWs = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.ispassword === 'true'
      ? `${primaryColor}`
      : `${errorColor}`} !important;
`;
const FormHelperPWCF = styled(FormHelperText)`
  width: 100%;
  margin-left: 0 !important;
  font-weight: 700 !important;
  color: ${(props) =>
    props.ispassword2 === 'true'
      ? `${primaryColor}`
      : `${errorColor}`} !important;
`;

const SignUp = () => {
  const navigate = useNavigate();
  // Input Component--------------------------------------------------------
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // ErrorMessage State-----------------------------------------------------
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [password2Message, setPassword2Message] = useState('');

  // Validation State-------------------------------------------------------
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPassword2, setIsPassword2] = useState(false);

  // Email 유효성 관리-------------------------------------------------------
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('유효하지 않은 이메일');
      setIsEmail(false);
    } else {
      setEmailMessage('유효한 이메일 형식');
      setIsEmail(true);
    }
  }, []);

  // Name 유효성 관리-------------------------------------------------------
  const onChangeName = useCallback((e) => {
    const nameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{1,10}$/;
    const nameCurrent = e.target.value;
    setName(nameCurrent);
    if (!nameRegex.test(nameCurrent)) {
      setNameMessage('한글or영문자[1~10글자]');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식');
      setIsName(true);
    }
  }, []);

  // 비밀번호 유효성 관리----------------------------------------------------
  const onChangePassword1 = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자[8글자↑]');
      setIsPassword(false);
    } else {
      setPasswordMessage('비밀번호 보안 높음');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인 유효성 관리-----------------------------------------------
  const onChangePassword2 = useCallback(
    (e) => {
      const password2Current = e.target.value;
      setPassword2(password2Current);

      if (password === password2Current) {
        setPassword2Message('비밀번호 입력 일치');
        setIsPassword2(true);
      } else {
        setPassword2Message('비밀번호 입력 불일치');
        setIsPassword2(false);
      }
    },
    [password]
  );

  // Submit 실행------------------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      password2: data.get('password2'),
    };
    await axios
      .post('http://127.0.0.1:8000/login/signup/', joinData)
      .then((response) => {
        console.log(response);
        alert('회원가입되었습니다. 로그인 후 이용해주세요.');
        navigate('/signin', { replace: true });
      })
      .catch((error) => {
        if (error.request.status === 400) {
          alert('이미 가입된 이메일입니다. 다른 이메일로 시도해주세요.');
        }
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <TitleBox></TitleBox>
        <Typography
          color={primaryColor}
          sx={{
            fontSize: '14px',
            fontWeight: '900',
            marginTop: 1,
          }}
        >
          회원가입
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            marginTop: 3,
          }}
        >
          <FormControl component="fieldset">
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
              onChange={onChangeEmail}
              error={email !== '' && !isEmail}
            />
            <FormHelperEmails isemail={isEmail ? 'true' : 'false'}>
              {emailMessage}
            </FormHelperEmails>
            <TextField
              required
              fullWidth
              variant="standard"
              color="info"
              type="name"
              id="name"
              name="name"
              label="이름"
              sx={{ marginTop: 3 }}
              onChange={onChangeName}
              error={name !== '' && !isName}
            />
            <FormHelperNames isname={isName ? 'true' : 'false'}>
              {nameMessage}
            </FormHelperNames>
            <TextField
              required
              fullWidth
              variant="standard"
              color="info"
              type="password"
              id="password"
              name="password"
              label="비밀번호"
              sx={{ marginTop: 3 }}
              onChange={onChangePassword1}
              error={password !== '' && !isPassword}
            />
            <FormHelperPWs ispassword={isPassword ? 'true' : 'false'}>
              {passwordMessage}
            </FormHelperPWs>
            <TextField
              required
              fullWidth
              variant="standard"
              color="info"
              type="password"
              id="password2"
              name="password2"
              label="비밀번호 확인"
              sx={{ marginTop: 3 }}
              onChange={onChangePassword2}
              error={password2 !== '' && !isPassword2}
            />
            <FormHelperPWCF ispassword2={isPassword2 ? 'true' : 'false'}>
              {password2Message}
            </FormHelperPWCF>
            <br />
            <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
