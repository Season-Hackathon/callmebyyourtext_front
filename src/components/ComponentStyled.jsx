import styled from 'styled-components';
import { pointColor, primaryColor } from '../GlobalStyle';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.span`
  color: ${primaryColor};
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid ${primaryColor};
`;

export const QuestionBox = styled.section`
  width: 250px;
  min-height: 100px;
  overflow: hidden;
  word-wrap: break-word;
  box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 20%);
  border-radius: 5px;
  margin-bottom: 10%;
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
  color: ${pointColor};
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
