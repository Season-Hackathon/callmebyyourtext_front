import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  BeQuestion,
  Container,
  CreateQuestionBox,
  CreateQuestionText,
  RecommendQuestion,
  TitleBox,
} from '../components/ComponentStyled';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Instance } from 'components/Instance';
import axios from 'axios';
import { getCookie } from 'components/Cookie';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('id');
  const [question, setQuestion] = useState('');
  // const accessToken = localStorage.getItem('access_token');
  // const refreshToken = getCookie('refresh_token');

  const goToHome = () => {
    navigate('/');
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setQuestion({
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName && userId) {
      await Instance.post('http://127.0.0.1:8000/questions', question)
        .then((response) => {
          console.log(response);
          navigate(`/questionlist/${userId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('로그인 후 이용해주세요.');
      return;
    }
  };

  return (
    <>
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        {userName ? (
          <CreateQuestionText>{userName}님의 질문 만들기</CreateQuestionText>
        ) : (
          <CreateQuestionText>
            로그인 후 질문을 생성할 수 있어요.
          </CreateQuestionText>
        )}
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
            label="질문을 입력해주세요."
            multiline
            onChange={onChange}
            sx={{
              width: '350px',
              marginBottom: 1,
            }}
          />
          <CreateQuestionBox>
            <RecommendQuestion>질문 추천</RecommendQuestion>
            <BeQuestion>선물받은 질문</BeQuestion>
          </CreateQuestionBox>
          <br />
          <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuestion;
