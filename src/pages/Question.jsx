import React, { useContext, useEffect, useState } from 'react';
import { primaryColor, secondaryColor } from '../GlobalStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import Menu from '../assets/images/menu.png';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField, Typography } from '@mui/material';
import {
  DeleteText,
  Header,
  MyPage,
  QuestionBox,
  Wrapper,
} from '../components/Styled';
import axios from 'axios';
import CommentComponent from '../components/List/CommentComponent';
import { display } from '@mui/system';

const Question = () => {
  // 변수 관리---------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const { question, questionId, writer } = location.state;
  const { isLoggedIn } = useContext(AuthContext);
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const Auth = localStorage.getItem('auth');
  const accessToken = localStorage.getItem('access_token');
  const [comments, setComments] = useState({
    questionId,
    comment: '',
    anonymous: true,
  });

  // 함수 관리---------------------------------------------------------
  const copyLink = () => {
    navigator.clipboard.writeText(window.document.location.href);
    alert('주소가 복사되었습니다.');
  };

  const goToMyPage = () => {
    if (Auth) {
      navigate(`/mypage/${userId}`);
    } else {
      localStorage.clear();
      return alert('로그인 후 이용해주세요.');
    }
  };
  const goToSignIn = () => {
    navigate('/signin');
  };

  // 질문 관리
  const deleteQuestion = async () => {
    if (window.confirm('해당 질문을 삭제하시겠습니까?')) {
      await axios
        .delete(`http://127.0.0.1:8000/questions/${questionId}`, {
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
    } else {
      return;
    }
  };

  // 답변 관리-------------------------------------------------------
  const [commentsArray, setCommentsArray] = useState([]);
  const fetchComments = async () => {
    try {
      const commentsData = await axios.get(
        `http://127.0.0.1:8000/questions/${questionId}`
      );
      setCommentsArray(commentsData.data.comments);
    } catch (error) {
      console.log(error);
      // alert('데이터를 가져오는데 실패했습니다. 다시 로그인해주세요.');
      // localStorage.clear();
      // navigate('/', { replace: true });
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const commentsList = [
    commentsArray?.map((c) => (
      <CommentComponent
        key={c.id}
        questionId={c.id}
        comment={c.comment}
        writer={c.writer}
      />
    )),
  ];

  // 답변 인풋 관리--------------------------------------------------
  const onChange = (e) => {
    const { name, value } = e.target;
    setComments({
      ...comments,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    await axios
      .post(
        `http://127.0.0.1:8000/questions/${questionId}/comments`,
        comments,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(comments);
      });
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: '800',
          position: 'fixed',
          top: '3px',
          right: '13px',
          color: `${primaryColor}`,
          cursor: 'pointer',
          display: `${Auth ? 'none' : 'inlineBlock'}`,
        }}
        onClick={goToSignIn}
      >
        로그인
      </Typography>
      <MyPage src={Menu} onClick={goToMyPage} />
      <Wrapper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            marginBottom: 1,
          }}
        >
          <Header>{writer}님의 질문입니다.</Header>
          {writer === userName ? (
            <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
          ) : (
            ''
          )}
        </Box>
        <QuestionBox>{question}</QuestionBox>
        {/* {writer === userName ? "사용자 접근" : "다른 사용자 접근"} */}
        <Box sx={{ overflowY: 'auto', width: '100%', maxHeight: '40vh' }}>
          {commentsArray.length === 0 ? (
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                color: `${secondaryColor}`,
              }}
            >
              등록된 답변이 없습니다.
            </Typography>
          ) : (
            [...commentsList]
          )}
        </Box>
        {writer === userName ? (
          ''
        ) : (
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            color="secondary"
            label="답변을 입력해주세요."
            id="comment"
            name="comment"
            type="comment"
            autoComplete="comment"
            sx={{
              borderBottom: `1px dashed ${primaryColor}`,
              borderRadius: 3,
              marginBottom: 2,
            }}
            onChange={onChange}
          />
        )}
        {writer === userName ? (
          ''
        ) : (
          <PrimaryBtn btnName={'답변 등록'} onClick={onSubmit}></PrimaryBtn>
        )}

        {/* <PrimaryBtn
          btnName={"SNS 공유하기"}
          onClick={() => alert("준비 중입니다.")}
        ></PrimaryBtn>
        <br />
        <PrimaryBtn btnName={"주소 복사"} onClick={copyLink}></PrimaryBtn> */}
      </Wrapper>
    </>
  );
};

export default Question;
