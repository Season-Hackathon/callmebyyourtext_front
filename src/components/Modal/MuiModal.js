import { TextField, Modal, Typography, Box } from "@mui/material/";
import { pointColor, primaryColor } from "../../styles/GlobalStyle";
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import PrimaryBtn from "../Button/PrimaryBtn";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: `1px solid black`,
  borderRadius: 3,
  boxShadow: 24,
  border: `1px solid ${primaryColor}`,
  p: 4,
  pb: 1,
};

const ButtonWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const BottomBtnWrap = styled.div`
  width: 100%;
  text-align: end;
`;
const BottomBtn = styled.button`
  background: none;
  font-size: 10px;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  border: none;
  color: ${primaryColor};
  &:hover {
    background-color: ${primaryColor};
    color: white;
  }
`;

export default function MuiModal({
  open,
  modalClose,
  btnName1,
  onClick1,
  type1,
  btnName2,
  onClick2,
  type2,
  text,
  title,
  bottomBtn,
  onClickBottom,
}) {
  return (
    <Modal
      open={open}
      onClose={modalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ "white-space": "pre-line" }}
    >
      <Box sx={modalStyle}>
        <Typography
          fontFamily="Noto Sans KR Black"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          fontFamily="Noto Sans KR Black"
          id="modal-modal-description"
          align="center"
          sx={{ mt: 2, fontSize: 12 }}
        >
          {text}
        </Typography>
        <ButtonWrap>
          {btnName1 && (
            <PrimaryBtn
              btnName={btnName1}
              onClick={onClick1}
              type={type1}
              width={"100px"}
            />
          )}

          {btnName2 && (
            <PrimaryBtn
              btnName={btnName2}
              onClick={onClick2}
              type={type2}
              width={"100px"}
            />
          )}
        </ButtonWrap>
        <BottomBtnWrap>
          {bottomBtn && (
            <BottomBtn onClick={onClickBottom}>{bottomBtn}</BottomBtn>
          )}
        </BottomBtnWrap>
      </Box>
    </Modal>
  );
}
