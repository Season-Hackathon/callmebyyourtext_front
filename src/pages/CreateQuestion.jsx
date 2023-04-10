import { Typography, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SmallImg, Container, TitleBox } from '../components/ComponentStyled';
import { primaryColor, secondaryColor } from '../GlobalStyle';
import TitleLogo from '../assets/images/titleLogo.png';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import axios from 'axios';
import Title from '../components/Title/Title';
import { getCookie } from 'components/Cookie';
import { Instance } from 'components/Instance';

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
    await Instance.post('http://127.0.0.1:8000/questions', question, {
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
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        <Typography
          variant="h6"
          sx={{
            color: `${primaryColor}`,
            marginTop: 5,
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {userName}님의 질문 만들기
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
            variant="outlined"
            color="info"
            minRows={5}
            id="question"
            name="question"
            label="새로운 질문"
            multiline
            onChange={onChange}
            sx={{
              width: '300px',
              marginBottom: 3,
            }}
          />
          <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuestion;
