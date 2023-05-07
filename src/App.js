import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { AuthContext } from './context/AuthContext';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/Home';
import Question from './pages/Question';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import CreateQuestion from './pages/CreateQuestion';
import QuestionList from './pages/QuestionList';
import NotFound from './pages/NotFound';
import Guide from 'pages/Guide';
import About from 'pages/About';
import BeQuestions from 'pages/Bequestions';
import FallingEffect from 'components/FallingEffect';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('auth')) === true) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <>
      <FallingEffect />
      <CookiesProvider>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <GlobalStyle />
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/mypage/:userId" element={<MyPage />}></Route>
            <Route path="/guide" element={<Guide />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/question/:questionId" element={<Question />}></Route>
            <Route
              path="/question/bequestions/:ownerId"
              element={<BeQuestions />}
            ></Route>
            <Route
              path="/questionlist/:userId"
              element={<QuestionList />}
            ></Route>
            <Route
              path="/createquestion/:userId"
              element={<CreateQuestion />}
            ></Route>
          </Routes>
        </AuthContext.Provider>
      </CookiesProvider>
    </>
  );
};

export default App;
