import { Typography, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { SmallImg, Wrapper } from "../components/Styled";
import { pointColor, primaryColor } from "../styles/GlobalStyle";
import TitleLogo from "../assets/images/titleLogo.png";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/Button/PrimaryBtn";
import axios from "axios";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const [question, setQuestion] = useState("");
  const onChange = (e) => {
    const { name, value } = e.target;
    setQuestion({
      [name]: value,
    });
  };
  const Token = localStorage.getItem("token");
  const Id = localStorage.getItem("id");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/questions", question, {
        withCredentials: true,
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate(`/questionlist/${Id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Wrapper>
        <Typography
          variant="h5"
          sx={{
            color: `${pointColor}`,
            borderBottom: `1px solid ${primaryColor}`,
            marginBottom: "30%",
          }}
        >
          <SmallImg src={TitleLogo} /> {userName}님의 질문 만들기
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            required
            fullWidth
            color="secondary"
            minRows={5}
            id="question"
            name="question"
            label="새로운 질문"
            multiline
            onChange={onChange}
            sx={{
              border: `1px dotted ${primaryColor}`,
              borderTop: "none",
              borderRadius: 2,
              width: "250px",
              marginBottom: 3,
            }}
          />
          <PrimaryBtn btnName={"등록"} type="submit"></PrimaryBtn>
        </Box>
      </Wrapper>
    </>
  );
};

export default CreateQuestion;
