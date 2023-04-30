import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { modalStyle, Container, TitleBox } from 'components/ComponentStyled';
import { Box, Modal, Typography } from '@mui/material';
import { pointColor, primaryColor, secondaryColor } from 'GlobalStyle';
import axios from 'axios';
import PrimaryBtn from 'components/Button/PrimaryBtn';
import ListBtn from 'components/Button/ListBtn';
import styled from 'styled-components';

const Button = styled.button`
  width: 350px;
  height: 35px;
  min-height: 35px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  background-color: transparent;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    color: white;
    background-color: ${primaryColor};
    cursor: pointer;
  }
`;

const QuestionList = () => {
  // 변수 관리-----------------------------------------
  const navigate = useNavigate();
  const userName = localStorage.getItem('name');
  const { userId } = useParams();
  const accessToken = localStorage.getItem('access_token');

  // 페이지 이동 관리-----------------------------------
  const goToCreateQuestion = () => {
    navigate(`/createquestion/${userId}`);
  };
  const goToHome = () => {
    navigate('/');
  };

  // 모달 관리-----------------------------------------
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // 상태 관리-----------------------------------------
  const [questionArray, setQuestionArray] = useState([]);
  const [point, setPoint] = useState('');
  const fetchData = async () => {
    try {
      const getQuestionData = await axios.get(
        `http://127.0.0.1:8000/${userId}/questionList`
      );
      const getPoint = await axios.get(
        `http://127.0.0.1:8000/login/profile/${userId}/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuestionArray(getQuestionData.data);
      setPoint(getPoint.data.point);
    } catch (error) {
      console.log(error);
      // alert("데이터를 가져오는데 실패했습니다. 다시 로그인해주세요.");
      // console.clear();
      // localStorage.clear();
      // navigate("/signin");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const questionList = [
    questionArray?.map((q) => (
      <>
        <Button
          key={q.questionId}
          onClick={() => {
            navigate(`/question/${q.questionId}`, {
              state: {
                question: q.question,
                questionId: q.questionId,
                writer: q.writer,
                publish: q.publish,
                userId: userId,
              },
            });
          }}
        >
          {q.question.length > 20
            ? q.question.slice(0, 20) + '...'
            : q.question}
        </Button>
        <br key="enter" />
      </>
    )),
  ];

  return (
    <>
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        <Typography
          variant="h6"
          sx={{
            color: `${primaryColor}`,
            fontWeight: 600,
            marginTop: 5,
          }}
        >
          {userName}님의 ( &quot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot; )
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: `${pointColor}`,
            marginBottom: 5,
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            opacity: '75%',
          }}
        >
          현재 포인트 : {point}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '110%',
            maxHeight: '45vh',
            overflowY: 'auto',
          }}
        >
          {questionArray.length === 0 ? (
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                color: `${pointColor}`,
              }}
            >
              등록된 질문이 없습니다.
              <br />
              <br />
              <PrimaryBtn
                btnName={'질문 만들기'}
                onClick={goToCreateQuestion}
              ></PrimaryBtn>
            </Typography>
          ) : (
            [
              <ListBtn
                btnName={'+'}
                onClick={goToCreateQuestion}
                key={userId}
              />,
              <br key="enter" />,
              ...questionList,
            ]
          )}
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              textAlign: 'center',
              color: `${secondaryColor}`,
            }}
          >
            나의 포인트 :{' '}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default QuestionList;
