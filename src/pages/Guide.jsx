import React from 'react';
import { DarkContainer, TitleBox } from 'components/ComponentStyled';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

const GuideBody = styled.p`
  color: #fff;
  font-size: 1rem;
`;

const GuideList = styled.ul`
  color: #fff;
  font-size: 0.9rem;
  line-height: 50px;
`;

const Guide = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  return (
    <>
      <DarkContainer className="fadeIn">
        <TitleBox onClick={goToHome} />
        <br />
        <p>&lt;사용 방법 안내&gt;</p>
        {/* <GuideBody>
          Call me by your TEXT는 <br /> 질문으로 나를 더 알아가기 위한
          서비스입니다.
        </GuideBody> */}
        <br />
        <GuideList>
          <li>
            <FontAwesomeIcon icon={faUserSecret} /> 나만의 질문을 만들고 SNS를
            통해 공유합니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faUserSecret} /> 가지고 있는 포인트로 나의
            질문에 달린 답변을 확인합니다.
          </li>
          <li>
            <FontAwesomeIcon icon={faUserSecret} /> 다른 이의 질문에 대한 답변을
            통해 추가 포인트 획득 가능합니다.
          </li>
          <li></li>
        </GuideList>
      </DarkContainer>
    </>
  );
};

export default Guide;
