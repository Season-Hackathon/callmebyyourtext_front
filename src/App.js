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
import Snowfall from 'react-snowfall';
import CreateQuestion from './pages/CreateQuestion';
import QuestionList from './pages/QuestionList';
import NotFound from './pages/NotFound';
import Comments from './pages/Comments';

const flowerFlake1 = document.createElement('img');
flowerFlake1.src = './assets/images/cherryblossom1.png';

const flowerFlake2 = document.createElement('img');
flowerFlake2.src = './assets/images/cherryblossom2.png';

const flowerFlake3 = document.createElement('img');
flowerFlake3.src = './assets/images/cherryblossom3.png';

const springEffect = [flowerFlake1, flowerFlake2, flowerFlake3];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('auth')) === true) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  return (
    <>
      <Snowfall
        color="pink"
        snowflakeCount={10}
        changeFrequency={100}
        speed={[1.0, 2.0]}
        wind={[-0.5, 1.5]}
        // images={springEffect}
      />
      <CookiesProvider>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <GlobalStyle />
          <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/question/:questionId" element={<Question />}></Route>
            <Route path="/comments/:questionId" element={<Comments />}></Route>
            <Route
              path="/questionlist/:userId"
              element={<QuestionList />}
            ></Route>
            <Route
              path="/createquestion/:userId"
              element={<CreateQuestion />}
            ></Route>
            <Route path="/mypage/:userId" element={<MyPage />}></Route>
          </Routes>
        </AuthContext.Provider>
      </CookiesProvider>
    </>
  );
};

export default App;
