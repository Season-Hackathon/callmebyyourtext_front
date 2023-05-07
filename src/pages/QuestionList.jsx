import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  modalStyle,
  Container,
  TitleBox,
  QListButton,
} from 'components/ComponentStyled';
import { Box, Modal, Typography } from '@mui/material';
import { pointColor, primaryColor, secondaryColor } from 'GlobalStyle';
import axios from 'axios';
import PrimaryBtn from 'components/Button/PrimaryBtn';

const QuestionList = () => {
  // 변수 관리-----------------------------------------
  const navigate = useNavigate();
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
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    name: '',
    point: '',
  });
  const fetchData = async () => {
    try {
      const getQuestionData = await axios.get(
        `https://callmebyyourtext.xyz/${userId}/questionList`
      );

      const getUserInfo = await axios.get(
        `https://callmebyyourtext.xyz/login/profile/${userId}/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuestionArray(getQuestionData.data);
      setUserInfo({
        ...userInfo,
        name: getUserInfo.data.name,
        point: getUserInfo.data.point,
      });
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
      <React.Fragment key={q.questionId}>
        <QListButton
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
          {q.question.length > 25
            ? q.question.slice(0, 25) + '...'
            : q.question}
        </QListButton>
        <br key="enter" />
      </React.Fragment>
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
          {userInfo.name}님의 ( &quot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;
          )
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
          현재 포인트 : {userInfo.point}
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
              <QListButton onClick={goToCreateQuestion} key={userId}>
                +
              </QListButton>,
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
