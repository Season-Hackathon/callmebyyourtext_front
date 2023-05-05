import { Typography, Box, Modal } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { pointColor, primaryColor, secondaryColor } from 'GlobalStyle';
import Typewriter from 'typewriter-effect';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import {
  modalStyle,
  Container,
  TitleBox,
  LogOutBox,
  MainButton,
} from 'components/ComponentStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faList,
  faCircleInfo,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import { Instance } from 'components/Instance';
import { removeCookie } from '../Cookie';
import axios from 'axios';

const MyPage = () => {
  // 변수 관리
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userName, setUserName] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const targetUserData = await Instance.get(
        `http://13.209.43.178/login/profile/${userId}`
      );
      setUserName(targetUserData.data.name);
    } catch (error) {
      alert('유저 정보를 불러오지 못했습니다, 로그인 페이지로 이동합니다.');
      // console.clear();
      // localStorage.clear();
      // removeCookie('refresh_token');
      // navigate('/signin', { replace: true });
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const goToHome = () => {
    navigate('/');
  };

  // 모달 관리
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  // 모달 인풋 관리
  const goToGuide = () => {
    navigate(`/guide`);
  };
  const goToAbout = () => {
    navigate(`/about`);
  };
  const goToNewQuestion = () => {
    navigate(`/createquestion/${userId}`);
  };
  const goToQuestionList = () => {
    navigate(`/questionlist/${userId}`);
  };

  // 로그아웃 관리
  const logout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      setIsLoggedIn(false);
      console.clear();
      localStorage.clear();
      removeCookie('refresh_token');
      // navigate("/", { replace: true });
      window.location.replace('/');
    } else {
      return;
    }
  };

  return (
    <>
      <Container className="fadeIn">
        <TitleBox onClick={goToHome}></TitleBox>
        <br />
        <Typography
          className="fadeIn"
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '20px',
            fontSize: '14px',
            fontWeight: '600',
            color: `${primaryColor}`,
            padding: '13px',
            marginBottom: 5,
            border: `4px solid ${primaryColor}`,
            borderTop: 'none',
            borderBottom: 'none',
          }}
        >
          {userName}님의 페이지
        </Typography>
        <Box
          sx={{
            whiteSpace: 'pre-wrap',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center',
            minWidth: '250px',
            minHeight: '17vh',
            lineHeight: '1.5',
            color: `${pointColor}`,
            marginBottom: 5,
            borderTop: `1px dashed ${pointColor}`,
            borderBottom: `1px dashed ${pointColor}`,
            borderRadius: 3,
            padding: 3,
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("'꽃 피는 계절, 새로운 시작.\n")
                .pauseFor(1000)
                .typeString('겨울이 추위를 녹이는 시간.\n')
                .pauseFor(500)
                .typeString('산들바람, ')
                .pauseFor(500)
                .typeString('불어오는 중간고사')
                .pauseFor(700)
                .deleteChars(4)
                .typeString('<strong>따스한 봄</strong>.\n\n')
                .pauseFor(1000)
                .typeString("<strong>당신</strong>은 어떤 사람인가요?'")
                .start();
            }}
          />
        </Box>
        <MainButton onClick={modalOpen}>더 알아보기</MainButton>
      </Container>
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              width: '150px',
              fontSize: 15,
              fontWeight: 700,
              color: `#fff`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${secondaryColor}`,
              },
            }}
            onClick={goToGuide}
          >
            <FontAwesomeIcon icon={faCircleInfo} /> 서비스 사용 안내
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              width: '150px',
              fontSize: 15,
              fontWeight: 700,
              color: `#fff`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${secondaryColor}`,
              },
            }}
            onClick={goToNewQuestion}
          >
            <FontAwesomeIcon icon={faPlus} /> 새로운 질문 만들기
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              width: '150px',
              fontSize: 15,
              fontWeight: 700,
              color: `#fff`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${secondaryColor}`,
              },
            }}
            onClick={goToQuestionList}
          >
            <FontAwesomeIcon icon={faList} /> 내 질문 리스트 보기
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              width: '150px',
              fontSize: 15,
              fontWeight: 700,
              color: `#fff`,
              marginBottom: 3,
              cursor: 'pointer',
              transition: '0.5s',
              '&:hover': {
                color: `${secondaryColor}`,
              },
            }}
            onClick={goToAbout}
          >
            <FontAwesomeIcon icon={faUserSecret} /> ABOUT
          </Typography>
          <LogOutBox>
            <Typography
              id="modal-modal-description"
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 25,
                fontSize: 12,
                fontWeight: 700,
                color: `${secondaryColor}`,
                opacity: '0.75',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  opacity: '1',
                },
              }}
              onClick={logout}
            >
              로그아웃
            </Typography>
          </LogOutBox>
        </Box>
      </Modal>
    </>
  );
};

export default MyPage;
