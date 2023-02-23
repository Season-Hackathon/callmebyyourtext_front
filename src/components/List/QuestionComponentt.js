import React from "react";
import ListBtn from "../Button/ListBtn";
import { Link } from "react-router-dom";

const QuestionComponent = ({ question, questionId, writer }) => {
  return (
    <>
      <Link
        to={`/question/${questionId}`}
        state={{ questionId, question, writer }}
      >
        <ListBtn btnName={question}></ListBtn>
      </Link>
      {/* <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 16,
              fontFamily: "Noto Sans KR Black",
              borderBottom: `1px solid ${primaryColor}`,
              marginBottom: 3,
              paddingBottom: 1,
              position: "relative",
            }}
          >
            <SmallImg src={HeartLogo} /> {question}
            <Typography sx={{ position: "absolute", top: 0, right: 0 }}>
              <DeleteText onClick={deleteQuestion}>삭제</DeleteText>
            </Typography>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: 13,
              fontFamily: "Noto Sans KR Black",
              opacity: "75%",
              textAlign: "right",
              transition: "0.5s",
              "&:hover": {
                color: `${primaryColor}`,
              },
            }}
          ></Typography>
        </Box>
      </Modal> */}
      <br />
    </>
  );
};

export default QuestionComponent;
