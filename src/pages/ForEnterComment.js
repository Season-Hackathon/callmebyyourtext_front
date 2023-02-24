import React, { useState, useEffect, useContext } from "react";
import Header from "./../components/Header/Header";
import Question from "./../components/Question/Question";
import Button from "./../components/Button/Button";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";
import { TextField } from "@mui/material/";
import MuiModal from "../components/Modal/MuiModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { secondaryColor } from "../styles/GlobalStyle";

const Wrapper = styled.section`
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8ecec;
`;
const HeaderWrap = styled.div`
  background-color: white;
  width: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1rem;
  font-family: "Noto Sans KR Bold";
  font-weight: 300;
  margin: 0 auto;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const MainTitle = styled.span`
  text-align: start;
  margin: 1rem 0 0 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${secondaryColor};
`;

export default function ForEnterComment() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const pageWriter = localStorage.getItem("pageWriter");
  const question = localStorage.getItem("question");
  const { id } = useParams();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isLoggedIn]);
  const userName = localStorage.getItem("name");

  // State-------------------------------------------------------------------
  // textFiled 입력값 상태
  const [inputText, setInputText] = useState("");
  // 첫번째 답변등록 버튼 상태 (toggle로 사용)
  const [addComment, setAddComment] = useState(false);
  const [buttonText, setButtonText] = useState("댓글달기");
  // 모달 관리
  const [open, setOpen] = useState(false);

  // eventHandler-------------------------------------------------------------------
  // textfiled change handler
  const handleChange = (e) => {
    setInputText(e.target.value);
    // console.log(inputText);
  };
  // 첫번째 답변등록 toggle로 사용
  const toggleAddComment = () => {
    setAddComment(!addComment);
    setInputText("");
    setButtonText(addComment ? "답변등록" : "돌아가기");
  };

  // 답변달기 확인 handler
  const comfirmComment = async (e) => {
    const question = id;
    const comment = inputText;
    const anonymous = isLoggedIn;
    const newComment = {
      question,
      comment,
      anonymous,
    };
    console.log(newComment);
    axios
      .post(`http://127.0.0.1:8000/questions/${id}/comments`, newComment)
      .then((response) => {
        alert("답변이 달렸습니다.");
        navigate(`/endtocomment`, { replace: true });
      })
      .catch((error) => {
        alert(error);
      });
  };

  // modal event handler
  const modalOpen = () => {
    if (inputText.trim() === "") {
      alert("답변을 입력해주세요");
      return;
    }
    if (isLoggedIn) {
      comfirmComment();
    } else {
      setOpen(true);
    }
  };
  const modalClose = () => setOpen(false);

  return (
    <>
      <Wrapper>
        <HeaderWrap>
          <Header user={pageWriter} />
        </HeaderWrap>
        <Main>
          <MainTitle>
            <b>{pageWriter}</b>님이 올린 질문입니다.
          </MainTitle>
          <ul>
            <li>
              <Question value={question} />
            </li>
          </ul>
          {addComment && (
            <TextField
              id="filled-textarea"
              placeholder="답변달기"
              multiline
              variant="outlined"
              onChange={handleChange}
              value={inputText}
              margin="normal"
              rows={4}
              inputProps={{ style: { fontSize: 12 } }}
              sx={{
                backgroundColor: `#f4ffeb`,
                borderRadius: 2,
                border: "none",
                marginBottom: 2,
                width: `90%`,
                margin: `2rem auto`,
                boxShadow: `0px 3px 5px 0px rgba(0, 0, 0, 0.4)`,
              }}
            />
          )}
          <ButtonWrap style={{ "margin-bottom": "5rem" }}>
            <Button
              value={buttonText}
              onClick={toggleAddComment}
              width={addComment ? "150px" : "200px"}
              background={"#F8ECEC"}
              border={"2px solid"}
            />
            {addComment && (
              <Button
                value={"답변등록"}
                onClick={modalOpen}
                width={"150px"}
                background={"#F8ECEC"}
                border={"2px solid"}
              />
            )}
          </ButtonWrap>
          {/* 로그인 되어있는 사용자는 바로 다음 페이지로 */}

          <MuiModal
            open={open}
            onClose={modalClose}
            btnName1={"로그인하기"}
            btnName2={"답변달기"}
            onClick1={() => navigate(`/loadingtologinforcomment/${id}`)}
            onClick2={comfirmComment}
            text={"로그인하고 답변을 달면 100포인트가 지급됩니다."}
          />
        </Main>
      </Wrapper>
    </>
  );
}
