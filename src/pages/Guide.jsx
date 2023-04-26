import React from 'react';
import { DarkContainer, TitleBox } from 'components/ComponentStyled';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserSecret,
  faPaperPlane,
  faHandHoldingHeart,
  faMotorcycle,
  faUnlock,
  faLightbulb,
  faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';
import { primaryColor, secondaryColor } from 'GlobalStyle';

const GuideButton = styled.button`
  width: 500px;
  height: 35px;
  border: 1px solid transparent;
  background: none,
    linear-gradient(to right, ${primaryColor}, ${secondaryColor});
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 530px) {
    width: 400px;
  }
`;

const WarningButton = styled.button`
  width: 500px;
  height: 35px;
  border: 1px solid transparent;
  background: none, linear-gradient(to left, ${primaryColor}, ${secondaryColor});
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 530px) {
    width: 400px;
  }
`;

const GuideList = styled.ul`
  width: 500px;
  color: #fff;
  font-size: 0.9rem;
  line-height: 50px;
  @media screen and (max-width: 530px) {
    width: 400px;
    font-size: 0.76rem;
  }
`;

const Guide = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  return (
    <>
      <DarkContainer>
        <TitleBox onClick={goToHome} className="fadeIn" />
        <br /> <br />
        <GuideButton className="fadeIn">사용 방법</GuideButton>
        <GuideList className="fadeIn">
          <li>
            <FontAwesomeIcon icon={faPaperPlane} /> 나만의 질문을 만들고 SNS를
            통해 공유합니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faLightbulb} /> 가지고 있는 포인트로 나의
            질문에 달린 답변을 확인합니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faPeopleArrows} /> 다른 이의 질문에 대한
            답변을 통해 추가 포인트 획득 가능합니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faPaperPlane} /> 다른 이의 질문 리스트에
            등록되었으면 하는 질문을 추천할 수도 있어요
          </li>
          <li>
            <FontAwesomeIcon icon={faUnlock} /> 자신의 질문에 달린 답변에 대한
            제 3자의 공개 가능 여부를 체크할 수 있어요
          </li>
          <li>
            <FontAwesomeIcon icon={faMotorcycle} /> 생성한 질문 공유 및 내보내기
            링크를 통해 다른 이의 솔직한 답변을 받아 보세요!
          </li>
          <hr />
        </GuideList>
        <br /> <br />
        <WarningButton className="fadeIn">주의 사항</WarningButton>
        <GuideList className="fadeIn">
          <li>
            <FontAwesomeIcon icon={faUserSecret} /> 모든 답변은 익명으로
            등록됩니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faHandHoldingHeart} /> 타인에 대한 비방 및
            비하, 욕설 표현은 자제해요.
          </li>
        </GuideList>
      </DarkContainer>
    </>
  );
};

export default Guide;
