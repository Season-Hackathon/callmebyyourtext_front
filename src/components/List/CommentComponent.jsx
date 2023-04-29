import { Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import { CommentBox, SecretCommentBox } from '../ComponentStyled';
import { errorColor, pointColor, primaryColor } from '../../GlobalStyle';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faLock,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Emotion = styled.p`
  color: ${errorColor};
`;

const CommentComponent = ({
  comment,
  commentId,
  questionId,
  openUser,
  writer,
  userId,
  point,
}) => {
  // 상태 관리 --------------------------------------------
  const [isOpen, setIsOpen] = useState(openUser);
  const [pointRefresh, setPointRefresh] = useState(point);
  const [fire, setFire] = useState(0);

  // 변수 관리 --------------------------------------------
  const accessToken = localStorage.getItem('access_token');

  // 함수 관리 --------------------------------------------
  const openComment = async () => {
    // 답변 공개
    if (window.confirm('50포인트를 소모하여 해당 답변을 확인하시겠습니까?')) {
      await axios
        .get(
          `http://127.0.0.1:8000/questions/${questionId}/comments/${commentId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          const getPoint = axios.get(
            `http://127.0.0.1:8000/login/profile/${userId}/`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (userId === response.data.open_user[0].id) {
            setPointRefresh(getPoint);
            setIsOpen(response.data.open_user[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };
  const fireComment = async () => {
    // 답변 추천
    await axios
      .get(`http://127.0.0.1:8000/comments/${userId}/likes`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isOpen?.id === userId ? (
        <CommentBox>
          <FontAwesomeIcon icon={faUserSecret} />{' '}
          <span>익명 답변 : {comment}</span>
          <Emotion>
            <FontAwesomeIcon icon={faFire} /> {fire}
          </Emotion>
        </CommentBox>
      ) : (
        <SecretCommentBox onClick={openComment}>
          <FontAwesomeIcon icon={faLock} /> <span>비공개 답변입니다.</span>
          <Emotion>
            <FontAwesomeIcon icon={faFire} /> {fire}
          </Emotion>
        </SecretCommentBox>
      )}
    </>
  );
};

export default memo(CommentComponent);
