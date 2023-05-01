import React, { useCallback, useEffect, useState } from 'react';
import { pointColor } from '../GlobalStyle';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryBtn from '../components/Button/PrimaryBtn';
import { Box, TextField, Typography } from '@mui/material';
import {
  DeleteText,
  Header,
  QuestionBox,
  Container,
  LockComment,
  QuestionSubBox,
  SquareSubmitButton,
} from '../components/ComponentStyled';
import axios from 'axios';
import CommentComponent from '../components/List/CommentComponent';
import { TitleBox } from 'components/ComponentStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Instance } from 'components/Instance';

const Question = () => {
  // 변수 관리-------------------------------------------------------
  const navigate = useNavigate();
  const { questionId } = useParams();
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  const accessToken = localStorage.getItem('access_token');

  // 상태 관리-------------------------------------------------------
  const [questionInfo, setQuestionInfo] = useState({});
  const [point, setPoint] = useState('');
  const [comments, setComments] = useState({
    questionId,
    comment: '',
    anonymous: true,
  });

  // 데이터 관리-------------------------------------------------------
  const fetchData = useCallback(async () => {
    try {
      const questionData = await axios.get(
        `http://127.0.0.1:8000/questions/${questionId}`
      );

      setQuestionInfo({
        ...questionInfo,
        publish: questionData.data.publish,
        question: questionData.data.question,
        questionId: questionData.data.questionId,
        writer: questionData.data.writer,
        writerId: questionData.data.writer_id,
        commentsArray: questionData.data.comments,
      });
      //
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
  }, [questionInfo]);

  // 렌더링 관리----------------------------------------------------
  useEffect(() => {
    fetchData();
  }, [comments]);

  const commentsList = [
    questionInfo.commentsArray?.map((c) => (
      <CommentComponent
        key={c.commentId}
        openUsers={c.open_user}
        questionId={c.questionId}
        commentId={c.commentId}
        comment={c.comment}
        writer={c.writer}
        like_count={c.like_count}
        userId={questionInfo.userId}
        point={point}
        setPoint={setPoint}
        published={questionInfo.publish}
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
  // 질문 답변 공개 관리
  const publishComment = async () => {
    if (questionInfo.publish) {
      if (window.confirm('해당 질문 답변 공개를 제한하시겠습니까?')) {
        await axios
          .put(
            `http://127.0.0.1:8000/questions/${questionId}`,
            { publish: !questionInfo.publish },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setQuestionInfo({
              ...questionInfo,
              publish: !questionInfo.publish,
            });
            alert('해당 질문은 본인을 제외한 제 3자의 답변 열람이 제한됩니다.');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    } else {
      if (window.confirm('해당 질문 답변 공개를 허용하시겠습니까?')) {
        await axios
          .put(
            `http://127.0.0.1:8000/questions/${questionId}`,
            { publish: !questionInfo.publish },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              publish: !questionInfo.publish,
            }
          )
          .then((response) => {
            console.log(response);
            setQuestionInfo({
              ...questionInfo,
              publish: !questionInfo.publish,
            });
            alert('해당 질문은 제 3자가 포인트를 통해 답변 열람이 가능합니다.');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    }
  };

  return (
    <>
      <Container>
        <TitleBox onClick={goToHome}></TitleBox>
        {userName && userId ? (
          <QuestionSubBox>반갑습니다, {userName}님</QuestionSubBox>
        ) : (
          <QuestionSubBox onClick={goToHome}>
            로그인 후 답변을 남길 수 있어요.
          </QuestionSubBox>
        )}
        {questionInfo.writer === userName && userId ? (
          <Typography
            variant="h6"
            sx={{
              color: `${pointColor}`,
              fontSize: '14px',
              fontWeight: '600',
              marginTop: 1,
            }}
          >
            현재 포인트 : {point}
          </Typography>
        ) : (
          ''
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            width: '350px',
            marginTop: 5,
          }}
        >
          <Header>{questionInfo.writer}님의 질문</Header>
          {questionInfo.writer === userName && userId ? (
            <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
          ) : (
            ''
          )}
        </Box>
        <QuestionBox>{questionInfo.question}</QuestionBox>

        {questionInfo.writer === userName ? (
          <>
            {questionInfo.publish ? (
              <>
                <LockComment onClick={publishComment}>
                  제 3자의 답변 열람 가능 <FontAwesomeIcon icon={faUnlock} />
                </LockComment>
              </>
            ) : (
              <>
                <LockComment onClick={publishComment}>
                  답변 공개 잠금 <FontAwesomeIcon icon={faLock} />
                </LockComment>
              </>
            )}
          </>
        ) : (
          ''
        )}
        <br />
        <Box
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '350px',
            maxHeight: '20vh',
          }}
        >
          {questionInfo.commentsArray?.length === 0 ? (
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                color: `${pointColor}`,
              }}
            >
              <br />
              등록된 답변이 없습니다.
            </Typography>
          ) : (
            [...commentsList]
          )}
        </Box>
        {questionInfo.writer === userName ? (
          ''
        ) : (
          <>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                width: '350px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                variant="outlined"
                multiline
                autoFocus
                color="info"
                label="답변을 입력해주세요."
                value={comments.comment}
                id="comment"
                name="comment"
                type="text"
                sx={{
                  width: '290px',
                  borderRadius: 3,
                  margin: '10px 0',
                }}
                onChange={onChange}
              />
              <SquareSubmitButton>등록</SquareSubmitButton>
            </Box>
          </>
        )}
        <br />
        <PrimaryBtn btnName={'SNS 공유하기'}></PrimaryBtn>
        <br />
        <PrimaryBtn btnName={'주소 복사'} onClick={copyLink}></PrimaryBtn>
        {questionInfo.writer !== userName ? (
          <>
            <br />
            <PrimaryBtn
              btnName={questionInfo.writer + '님에게 다른 질문 추천하기'}
              onClick={() =>
                navigate(`/question/bequestions/${questionId}`, {
                  state: {
                    ownerId: questionInfo.writerId,
                    ownerName: questionInfo.writer,
                  },
                })
              }
            ></PrimaryBtn>
          </>
        ) : (
          ''
        )}
      </Container>
    </>
  );
};

export default Question;
