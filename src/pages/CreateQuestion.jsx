import { Box, Modal, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BeQuestion,
  Container,
  CreateQuestionBox,
  CreateQuestionText,
  GivenQuestionBox,
  GivenQuestionContent,
  GivenQuestionDelete,
  GivenQuestionHeader,
  GivenQuestionSubContent,
  RecommendQuestion,
  TitleBox,
  modalStyle2,
} from '../components/ComponentStyled';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Instance } from 'components/Instance';
import { DummyData } from 'components/DummyData';
import { secondaryColor } from 'GlobalStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('id');
  const [question, setQuestion] = useState('');
  const [givenQuestions, setGivenQuestions] = useState([]);
  // const accessToken = localStorage.getItem('access_token');
  // const refreshToken = getCookie('refresh_token');

  // 데이터 fetch
  const fetchData = useCallback(async () => {
    //modalOpen 리렌더링 시 참조값 바뀌지 않게
    try {
      const presentData = await Instance.get(
        `http://13.209.43.178/${userId}/bequestionlist`
      );
      setGivenQuestions(presentData.data);
    } catch (err) {
      console.log(err);
    }
  }, [givenQuestions]);
  useEffect(() => {
    fetchData();
  }, []);

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const goToHome = () => {
    navigate('/');
  };

  // 랜덤 추천 질문
  const randomQuestion = useCallback(() => {
    const dummyData = DummyData;
    const selectedNumber = Math.floor(Math.random() * dummyData.length);
    alert('랜덤으로 추첨된 질문입니다!');
    setQuestion(dummyData[selectedNumber].beQuestion);
  }, []);

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName && userId) {
      await Instance.post('http://13.209.43.178/questions', {
        question: question,
      })
        .then((res) => {
          console.log(res);
          navigate(`/questionlist/${userId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('로그인 후 이용해주세요.');
      return;
    }
  };

  const deletePresent = async () => {
    if (window.confirm('해당 추천 질문을 정말 삭제하시겠습니까?')) {
      await Instance.delete(`http://13.209.43.178/${userId}/bequestionlist`)
        .then((res) => {
          console.log(res);
          modalClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  };

  const givenQuestionArray = [
    givenQuestions?.map((data) => (
      <React.Fragment key={data.beQuestionId}>
        <GivenQuestionHeader>
          <GivenQuestionContent>
            <FontAwesomeIcon icon={faGift} /> 추천 질문{' '}
            <FontAwesomeIcon icon={faGift} />
          </GivenQuestionContent>
          <GivenQuestionDelete onClick={deletePresent}>
            삭제
          </GivenQuestionDelete>
        </GivenQuestionHeader>
        <GivenQuestionSubContent
          onClick={() => {
            if (window.confirm('해당 선물받은 추천 질문을 생성하시겠습니까?')) {
              setQuestion(data.q);
              modalClose();
            } else return;
          }}
        >
          {data.q}
        </GivenQuestionSubContent>
        <br /> <br />
      </React.Fragment>
    )),
  ];
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
            value={question}
            label="질문을 입력해주세요."
            multiline
            onChange={onChange}
            sx={{
              width: '350px',
              marginBottom: 1.5,
            }}
          />
          <CreateQuestionBox>
            <RecommendQuestion onClick={randomQuestion}>
              랜덤 추천 질문
            </RecommendQuestion>
            <BeQuestion onClick={modalOpen}>선물받은 질문</BeQuestion>
          </CreateQuestionBox>
          <br />
          <PrimaryBtn btnName={'등록'} type="submit"></PrimaryBtn>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle2}>
          <Typography
            id="modal-modal-description"
            sx={{
              width: '90%',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              color: `${secondaryColor}`,
              cursor: 'pointer',
              borderLeft: '5px solid white',
              borderRight: '5px solid white',
              transition: '0.5s',
              '&:hover': {
                borderColor: `${secondaryColor}`,
              },
            }}
            onClick={() => {
              alert('마음에 드는 선물을 선택해 새로운 질문을 만들어보세요!');
            }}
          >
            익명으로부터 선물받은 질문 목록
          </Typography>
          {givenQuestions?.length >= 1 ? (
            <GivenQuestionBox>{[...givenQuestionArray]}</GivenQuestionBox>
          ) : (
            '선물 목록이 비어있어요'
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateQuestion;
