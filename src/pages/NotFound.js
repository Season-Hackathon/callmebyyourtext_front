import React from "react";
import { Img, SubTitle, Wrapper } from "../components/Styled";
import Title from "../components/Title/Title";
import Logo from "../assets/images/loadingLogo.png";
import PrimaryBtn from "../components/Button/PrimaryBtn";
import { RedirectURL } from "../components/Paginations/paginations";

const NotFound = () => {
  return (
    <>
      <Wrapper>
        <Img src={Logo} alt="error" />
        <Title />
        <SubTitle>
          존재하지 않는 페이지입니다.
          <br />
          다시 시도해주세요.
        </SubTitle>
        <PrimaryBtn btnName={"돌아가기"} onClick={RedirectURL}></PrimaryBtn>
      </Wrapper>
    </>
  );
};

export default NotFound;
