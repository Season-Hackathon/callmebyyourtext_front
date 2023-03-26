import { Box, Typography } from '@mui/material';
import React from 'react';
import { CursorText, DeleteText, SmallImg } from '../ComponentStyled';
import HeartLogo from '../../assets/images/inputId.png';
import TitleLogo from '../../assets/images/titleLogo.png';
import { primaryColor, secondaryColor } from '../../GlobalStyle';
import axios from 'axios';

const CommentComponent = ({ questionId, comment }) => {
  const userName = localStorage.getItem('name');
  const openComment = ({ commentId }) => {
    if (window.confirm('50포인트를 소모하여 해당 답변을 확인하시겠습니까?')) {
      axios
        .post(
          `http://127.0.0.1:8000/questions/${questionId}/comments/${commentId}`
        )
        .then((response) => {
          console.log(response);
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
      {/* <Box
        sx={{
          mt: 3,
          fontSize: 16,
          fontFamily: "Noto Sans KR Black",
          borderBottom: `1px solid ${primaryColor}`,
          marginBottom: 1,
          paddingBottom: 0.5,
        }}
      >
        <SmallImg src={HeartLogo} />
        <CursorText onClick={openComment}> 익명의 답변 : </CursorText>
        {questionText}
      </Box> */}
    </>
  );
};

export default CommentComponent;
