import React, { memo, useState } from 'react';
import {
  CommentBox,
  FireComment,
  SecretComment,
  SecretCommentBox,
} from '../ComponentStyled';
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
  openUser,
  questionId,
  commentId,
  comment,
  writer,
  userId,
  point,
  fire,
}) => {
  // 상태 관리 --------------------------------------------
  const [isOpen, setIsOpen] = useState(openUser);
  const [pointRefresh, setPointRefresh] = useState(point);
  const [fires, setFires] = useState(fire);
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
    if (window.confirm('해당 답변을 추천하시겠습니까?')) {
      // 답변 추천
      await axios
        .get(`http://127.0.0.1:8000/comments/${commentId}/likes`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setFires(fires + 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  return (
    <>
      {isOpen?.id === userId ? (
        <CommentBox>
          <FontAwesomeIcon icon={faUserSecret} />{' '}
          <span>익명 답변 : {comment}</span>
          <Emotion>
            <FireComment onClick={fireComment}>추천</FireComment>{' '}
            <FontAwesomeIcon icon={faFire} /> {fires}
          </Emotion>
        </CommentBox>
      ) : (
        <SecretCommentBox>
          <SecretComment onClick={openComment}>
            <FontAwesomeIcon icon={faLock} /> 비공개 답변입니다.
          </SecretComment>
          <Emotion>
            <FireComment onClick={fireComment}>추천</FireComment>{' '}
            <FontAwesomeIcon icon={faFire} /> {fires}
          </Emotion>
        </SecretCommentBox>
      )}
    </>
  );
};

export default memo(CommentComponent);
