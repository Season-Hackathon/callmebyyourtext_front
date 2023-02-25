import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const GoToMyPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { isLoggedIn } = useContext(AuthContext)
  if (isLoggedIn) {
    navigate(`/mypage/${userId}`);
  } else {
    return alert("로그인 후 이용해주세요.");
  }
};

export const GoToHome = () => {
  const navigate = useNavigate();
  navigate("/");
};

export const RedirectURL = () => {
  const navigate = useNavigate();
  navigate("/", { replace: true });
};

export const GoToSignIn = () => {
  const navigate = useNavigate();
  navigate("/signin");
};

export const GoToSignUp = () => {
  const navigate = useNavigate();
  navigate("/signup");
};

export const GoToCreateQuestion = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  navigate(`/createquestion/${userId}`);
};