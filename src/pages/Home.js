import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/loadingLogo.png";
import Title from "../components/Title/Title";
import { Bracket, Img, SubTitle, Wrapper } from "../components/Styled";

const Home = () => {
  const navigate = useNavigate();
  const loading = () => {
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  useEffect(() => {
    loading();
    return () => {
      clearTimeout(loading);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Img src={Logo} alt="error" />
        <Title />
        <SubTitle>
          나의 (<Bracket>빈칸</Bracket>), 당신의 ____
        </SubTitle>
      </Wrapper>
    </>
  );
};

export default Home;
