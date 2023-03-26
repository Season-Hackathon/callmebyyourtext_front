import React from "react";
import styled from "styled-components";

const Ques = styled.div`
  background-color: white;
  width: 90%;
  height: 100px;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-family: "Noto Sans KR Bold";
  font-weight: 500;
  font-size: 0.8rem;
`;
export default function Question({ value }) {
  return <Ques>{value}</Ques>;
}
