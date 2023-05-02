import React from 'react';
import {
  AboutBody,
  AboutButtonBox,
  AboutContributor,
  AboutHeader,
  DarkContainer,
  ImageBox,
} from 'components/ComponentStyled';
import Likelion from '../assets/images/LIKELION.png';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import TeamBtn from 'components/Button/TeamBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPaw } from '@fortawesome/free-solid-svg-icons';
import { secondaryColor } from 'GlobalStyle';

const About = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  const goToDongguk = () => {
    window.open('https://www.instagram.com/likelion_dongguk/', '_blank');
  };
  const goToSungkyul = () => {
    window.open('https://www.instagram.com/likelion_sku/', '_blank');
  };
  const goToDongDuk = () => {
    window.open('https://www.instagram.com/dongduk_likelion/', '_blank');
  };
  const goToSanmyung = () => {
    window.open('https://www.instagram.com/likelion_smu/', '_blank');
  };
  const goToSungshin = () => {
    window.open('https://www.instagram.com/likelion_sswu/', '_blank');
  };
  const goToHallym = () => {
    window.open('https://www.instagram.com/likelion_hallym/', '_blank');
  };

  return (
    <>
      <DarkContainer>
        <ImageBox
          src={Likelion}
          alt="LIKELION"
          onClick={goToHome}
          className="fadeIn"
        />
        <br /> <br />
        <AboutHeader className="fadeIn">
          멋쟁이사자처럼 벚꽃톤 프로젝트 'Call me by your TEXT'
        </AboutHeader>
        <br />
        <AboutBody className="fadeIn">
          "새로운 인연을 마주하는 계절입니다."
          <br />
          서로를 알아가는 과정에서 많은 대화가 오고 가지만,
          <br />
          정작 ‘나’에 대한 상대방의 솔직한 생각을 듣는 것은
          <br />
          쉽지 않은 일입니다.
          <br /> <br />
          질문하고 대답하는 과정을 통해,
          <br />
          ‘나’를 더 다양한 관점에서 알아갈 수 있기를 고대합니다.
        </AboutBody>
        <br /> <br />
        <AboutContributor
          className="fadeIn"
          onClick={() =>
            alert(
              '`멋쟁이사자처럼`은 프로그래밍이 하나의 수단이 되어 누구나 본인의 아이디어를 구현할 수 있도록 하는 공동체입니다.'
            )
          }
        >
          <FontAwesomeIcon icon={faCat} /> Contributor{' '}
          <FontAwesomeIcon icon={faCat} />
        </AboutContributor>
        <AboutButtonBox className="fadeIn">
          <TeamBtn btnName="LIKELION_DONGGUK" onClick={goToDongguk}></TeamBtn>
          <TeamBtn btnName="LIKELION_SUNGKYUL" onClick={goToSungkyul}></TeamBtn>
          <TeamBtn btnName="LIKELION_DONGDUK_W" onClick={goToDongDuk}></TeamBtn>
          <TeamBtn
            btnName="LIKELION_SANGMYUNG"
            onClick={goToSanmyung}
          ></TeamBtn>
          <TeamBtn
            btnName="LIKELION_SUNGSHIN_W"
            onClick={goToSungshin}
          ></TeamBtn>
          <TeamBtn btnName="LIKELION_HALLYM" onClick={goToHallym}></TeamBtn>
        </AboutButtonBox>
      </DarkContainer>
    </>
  );
};

export default About;
