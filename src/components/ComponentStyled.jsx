import styled from 'styled-components';
import { pointColor, primaryColor } from '../GlobalStyle';
import landingTitle from '../assets/images/landingTitle.png';
import ocean from '../assets/images/ocean.jpg';

export const Container = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.span`
  color: ${primaryColor};
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid ${primaryColor};
`;

export const TitleBox = styled.section`
  width: 350px;
  min-height: 50px;
  background-image: url(${landingTitle});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  // PC 화면
  @media screen and (min-width: 1024px) {
  }
  // 모바일 스타일
  @media screen and (max-width: 500px) {
  }
`;

export const QuestionBox = styled.section`
  width: 250px;
  min-height: 100px;
  overflow: hidden;
  word-wrap: break-word;
  border: 2px solid ${primaryColor};
  border-radius: 10px;
  margin: 10% 0;
  padding: 20px;
`;

export const CommentBox = styled.section`
  width: 250px;
  height: auto;
  padding: 2%;
  overflow: hidden;
  word-wrap: break-word;
`;

export const MyPage = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 13px;
`;

export const CursorText = styled.span`
  cursor: pointer;
`;

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: `1px solid ${primaryColor}`,
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const Img = styled.img`
  width: auto;
  margin-bottom: 15%;
`;

export const SmallImg = styled.img`
  width: 16px;
`;

export const SubTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 5%;
`;

export const Bracket = styled.span`
  visibility: hidden;
`;

export const DeleteText = styled.span`
  position: absolute;
  right: 0;
  font-size: 12px;
  opacity: 50%;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: ${primaryColor};
  }
`;
