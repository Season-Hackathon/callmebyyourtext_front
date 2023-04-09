import React, { useCallback, useEffect, useState } from 'react';
import { primaryColor, secondaryColor } from '../GlobalStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Box, TextField, Typography } from '@mui/material';
import {
  DeleteText,
  Header,
  QuestionBox,
  Wrapper,
} from '../components/ComponentStyled';
import axios from 'axios';
import CommentComponent from '../components/List/CommentComponent';
import Title from 'components/Title/Title';

const Question = () => {
  // 변수 관리-------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const { question, questionId, writer } = location.state;
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const accessToken = localStorage.getItem('access_token');

  // 상태 관리-------------------------------------------------------
  const [point, setPoint] = useState('');
  const [comments, setComments] = useState({
    questionId,
    comment: '',
    anonymous: true,
  });

  // 답변 관리-------------------------------------------------------
  const [commentsArray, setCommentsArray] = useState([]);
  const fetchComments = useCallback(async () => {
    try {
      const commentsData = await axios.get(
        `http://127.0.0.1:8000/questions/${questionId}`
      );
      setCommentsArray(commentsData.data.comments);
      const getPoint = await axios.get(
        `http://127.0.0.1:8000/login/profile/${userId}/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPoint(getPoint.data.point);
    } catch (error) {
      console.log(error);
      // alert('데이터를 가져오는데 실패했습니다. 다시 로그인해주세요.');
      // localStorage.clear();
      // console.clear();
      // navigate('/', { replace: true });
    }
  }, [commentsArray]);

  // 렌더링 관리----------------------------------------------------
  useEffect(() => {
    fetchComments();
  }, [comments]);
  const commentsList = [
    commentsArray?.map((c) => (
      <CommentComponent
        key={c.commentId}
        openUser={c.open_user[0]}
        questionId={c.questionId}
        commentId={c.commentId}
        comment={c.comment}
        writer={c.writer}
        point={point}
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
    e.preventDefault();
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
        setComments({
          ...comments,
          comment: '',
        });
        alert('답변이 정상적으로 등록되었습니다.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 함수 관리-------------------------------------------------------
  const copyLink = () => {
    navigator.clipboard.writeText(window.document.location.href);
    alert('주소가 복사되었습니다.');
  };
  const goToHome = () => {
    navigate('/');
  };

  // 질문 삭제 관리--------------------------------------------------
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

  return (
    <>
      <Title onClick={goToHome} />
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
        {writer === userName ? (
          <Typography
            variant="h6"
            sx={{
              color: `${secondaryColor}`,
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            현재 포인트 : {point}
          </Typography>
        ) : (
          ''
        )}
        <QuestionBox>{question}</QuestionBox>
        {/* {writer === userName ? "사용자 접근" : "다른 사용자 접근"} */}
        <Box sx={{ overflowY: 'auto', width: '100%', maxHeight: '30vh' }}>
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
          <>
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
            <PrimaryBtn btnName={'답변 등록'} onClick={onSubmit}></PrimaryBtn>
          </>
        )}
        {/* 임시 답변 등록 인풋 --------------------------------- */}
        {/* <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            color="secondary"
            label="답변을 입력해주세요."
            value={comments.comment}
            id="comment"
            name="comment"
            type="text"
            sx={{
              marginBottom: 2,
            }}
            onChange={onChange}
          />
          <PrimaryBtn btnName={'답변 등록'}></PrimaryBtn>
        </Box>
        <br /> */}
        {/* -------------------------------------------------- */}
        <br />
        <PrimaryBtn
          btnName={'SNS 공유하기'}
          onClick={() => alert('준비 중입니다.')}
        ></PrimaryBtn>
        <br />
        <PrimaryBtn btnName={'주소 복사'} onClick={copyLink}></PrimaryBtn>
      </Wrapper>
    </>
  );
};

export default Question;
