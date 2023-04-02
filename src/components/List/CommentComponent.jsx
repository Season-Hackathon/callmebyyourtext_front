import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { SmallImg } from '../ComponentStyled';
import TitleLogo from '../../assets/images/titleLogo.png';
import { primaryColor, secondaryColor } from '../../GlobalStyle';
import axios from 'axios';

const CommentComponent = ({
  comment,
  commentId,
  questionId,
  openUser,
  writer,
}) => {
  console.log(
    'commentId',
    commentId,
    'questionId',
    questionId,
    'openUser',
    openUser
  );
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('access_token');
  const openComment = ({ commentId }) => {
    if (window.confirm('50포인트를 소모하여 해당 답변을 확인하시겠습니까?')) {
      axios
        .get(`http://127.0.0.1:8000/questions/16/comments/7`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (userId === response.data.open_user[0].id) {
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };
  // CI 7 / QU 16
  return (
    <>
      {open === false ? (
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
          }}
        >
          <SmallImg src={TitleLogo} /> {comment}
        </Typography>
      )}
    </>
  );
};

export default CommentComponent;
