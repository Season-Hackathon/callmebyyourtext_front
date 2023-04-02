import { Typography, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SmallImg, Wrapper } from '../components/ComponentStyled';
import { primaryColor, secondaryColor } from '../GlobalStyle';
import TitleLogo from '../assets/images/titleLogo.png';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import axios from 'axios';
import Title from '../components/Title/Title';
import { getCookie } from 'components/cookie';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const [question, setQuestion] = useState('');

  const goToHome = () => {
    navigate('/');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setQuestion({
      [name]: value,
    });
  };
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = getCookie('refresh_token');
  const userId = localStorage.getItem('id');

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://127.0.0.1:8000/questions', question, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate(`/questionlist/${userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Wrapper className="fadeIn">
        <Title onClick={goToHome} />
        <Typography
          variant="h6"
          sx={{
            color: `${secondaryColor}`,
            marginBottom: '10%',
            // fontFamily: 'Noto Sans KR Black',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          <SmallImg src={TitleLogo} /> {userName}님의 질문 만들기
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            required
            fullWidth
            variant="standard"
            color="secondary"
            minRows={5}
            id="question"
            name="question"
            label="새로운 질문"
            multiline
            onChange={onChange}
            sx={{
              border: `1px dotted ${primaryColor}`,
              borderTop: 'none',
              borderBottom: 'none',
              borderRadius: 2,
              width: '250px',
              marginBottom: 3,
            }}
          />
          <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
        </Box>
      </Wrapper>
    </>
  );
};

export default CreateQuestion;
