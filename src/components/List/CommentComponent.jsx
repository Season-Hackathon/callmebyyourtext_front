import { Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import { CommentBox, SmallImg } from '../ComponentStyled';
import TitleLogo from '../../assets/images/titleLogo.png';
import { primaryColor, secondaryColor } from '../../GlobalStyle';
import axios from 'axios';

const CommentComponent = ({
  comment,
  commentId,
  questionId,
  openUser,
  writer,
  point,
}) => {
  // console.log(
  //   'commentId',
  //   commentId,
  //   'questionId',
  //   questionId,
  //   'openUser',
  //   openUser
  // );
  // 상태 관리 --------------------------------------------
  const [isOpen, setIsOpen] = useState(openUser);
  const [pointRefresh, setPointRefresh] = useState(point);

  // 변수 관리 --------------------------------------------
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('access_token');

  // 함수 관리 --------------------------------------------
  const openComment = async () => {
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
  return (
    <>
      {isOpen?.id === userId ? (
        <Typography
          variant="h6"
          sx={{
            width: '100%',
            color: `${secondaryColor}`,
            marginBottom: '10%',
            fontFamily: 'Noto Sans KR Black',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'left',
          }}
        >
          <SmallImg src={TitleLogo} />
          <CommentBox>
            <span>익명 답변 : {comment}</span>
          </CommentBox>
        </Typography>
      ) : (
        <Typography
          variant="h6"
          sx={{
            width: '100%',
            color: `${secondaryColor}`,
            marginBottom: '10%',
            fontFamily: 'Noto Sans KR Black',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'left',
            borderRadius: '10px',
            cursor: 'pointer',
            '&:hover': {
              color: `${primaryColor}`,
            },
          }}
          onClick={openComment}
        >
          <SmallImg src={TitleLogo} /> 비공개 답변입니다.
        </Typography>
      )}
    </>
  );
};

export default memo(CommentComponent);
