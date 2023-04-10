import React from 'react';
import {
  ButtonBox,
  DarkContainer,
  ImageBox,
  Item,
} from 'components/ComponentStyled';
import Likelion from '../assets/images/LIKELION.png';

import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import TeamBtn from 'components/Button/TeamBtn';

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
      <DarkContainer className="fadeIn">
        <Item>
          <ImageBox src={Likelion} alt="LIKELION" onClick={goToHome} />
          <Typography
            variant="h6"
            sx={{ fontWeight: '900', fontStyle: 'italic', color: 'white' }}
          >
            멋쟁이사자처럼 벚꽃톤 프로젝트 'Call me by your TEXT'
          </Typography>
          <br />
          <Typography
            sx={{
              border: '5px solid white',
              borderTop: 'none',
              borderBottom: 'none',
              padding: 4,
              lineHeight: 2.5,
            }}
          >
            "새로운 인연이 다가오는 계절입니다."
            <br />
            서로를 알아가는 과정에서 많은 대화가 오고 가지만,
            <br />
            정작 ‘나’에 대한 상대방의 솔직한 생각을 듣는 것은 쉽지 않은
            일입니다.
            <br />
            해당 프로젝트는 ‘나’를 더 다양한 관점에서 알아가기 위한 서비스로,
            <br />
            질문하고 대답하는 과정을 통해
            <br />
            자연스러운 관계 형성과 친밀도 상승이 가능해질 것입니다.
          </Typography>
          <br /> <br />
          <Typography sx={{ color: 'white', marginBottom: 1 }}>
            TEAM_6 Contributor
          </Typography>
          <ButtonBox>
            <TeamBtn btnName="LIKELION_DONGGUK" onClick={goToDongguk}></TeamBtn>
            <TeamBtn
              btnName="LIKELION_SUNGKYUL"
              onClick={goToSungkyul}
            ></TeamBtn>
            <TeamBtn
              btnName="LIKELION_DONGDUK_W"
              onClick={goToDongDuk}
            ></TeamBtn>
            <TeamBtn
              btnName="LIKELION_SANGMYUNG"
              onClick={goToSanmyung}
            ></TeamBtn>
            <TeamBtn
              btnName="LIKELION_SUNGSHIN_W"
              onClick={goToSungshin}
            ></TeamBtn>
            <TeamBtn btnName="LIKELION_HALLYM" onClick={goToHallym}></TeamBtn>
          </ButtonBox>
        </Item>
      </DarkContainer>
    </>
  );
};

export default About;
