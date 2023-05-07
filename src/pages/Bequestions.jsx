import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Container,
  CreateQuestionBox,
  CreateQuestionText,
  QuestionSubBox,
  RecommendQuestion,
  TitleBox,
} from '../components/ComponentStyled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Instance } from 'components/Instance';

const BeQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ownerName, questionId } = location?.state;
  const { ownerId } = useParams();
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('id');
  const [beQuestion, setBeQuestion] = useState('');
  // const accessToken = localStorage.getItem('access_token');
  // const refreshToken = getCookie('refresh_token');

  useEffect(() => {
    if (!ownerId) {
      alert(
        `잘못된 접근입니다. ${ownerName}님의 질문 페이지를 통해 재시도해주세요.`
      );
      navigate('/', { replace: true });
    }
  }, []);

  const goToHome = () => {
    navigate('/');
  };

  const onChange = (e) => {
    setBeQuestion(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName && userId) {
      await Instance.post('https://callmebyyourtext.xyz/bequestions', {
        q: beQuestion,
        ownerId: ownerId,
      })
        .then((res) => {
          console.log(res);
          alert('추천 질문이 정상 요청되었습니다.');
          navigate(`/question/${questionId}`);
        })
        .catch((err) => {
          console.log(err);
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
        <QuestionSubBox>반갑습니다, {userName}님</QuestionSubBox>
        {userName ? (
          <CreateQuestionText>
            {ownerName}님에게 다른 질문 추천하기
          </CreateQuestionText>
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
            value={beQuestion}
            label="추천하고 싶은 질문을 입력해주세요."
            multiline
            onChange={onChange}
            sx={{
              width: '350px',
              marginBottom: 1.5,
            }}
          />
          <CreateQuestionBox>
            <RecommendQuestion
              onClick={() =>
                alert('바르고 고운 말을 사용하는 올바른 문화에 함께 참여해요!')
              }
            >
              * {ownerName}님이 해당 질문을 등록할지 여부를 결정할 수 있어요
            </RecommendQuestion>
          </CreateQuestionBox>
          <br />
          <PrimaryBtn btnName={'추천 질문 보내기'} type="submit"></PrimaryBtn>
        </Box>
      </Container>
    </>
  );
};

export default BeQuestions;
