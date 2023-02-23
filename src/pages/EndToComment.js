import React, { useState } from "react";
import BackgroundImg from "../assets/images/endtocommentbg.png";
import styled from "styled-components";
import MuiModal from "../components/Modal/MuiModal";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: column;
  white-space: pre-line;
`;

const Img = styled.img`
  height: 60%;
  object-fit: contain;
`;

export default function EndToComment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <Wrapper>
      <Img src={BackgroundImg} />
      <MuiModal
        open={open}
        text={"답변이 성공적으로 등록되었습니다.\n 감사합니다."}
        bottomBtn={"초기화면으로"}
        onClickBottom={() => {
          console.log(20);
          setOpen(false);
          navigate("/");
        }}
      />
    </Wrapper>
  );
}
