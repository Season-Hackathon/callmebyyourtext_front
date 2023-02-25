import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import Home from "./pages/Home";
import Question from "./pages/Question";
import SignIn from "./pages/SignIn";
import ForEnterComment from "./pages/ForEnterComment";
import LoginForComment from "./pages/LoginForComment";
import NewQuestion from "./pages/NewQuestion";
import PointCheck from "./pages/PointCheck";
import SignUp from "./pages/SignUp";
import { AuthContext } from "./context/AuthContext";
import MyPage from "./pages/MyPage";
import Snowfall from "react-snowfall";
import LoadingToLoginForComment from "./pages/LoadingToLoginForComment";
import CreateQuestion from "./pages/CreateQuestion";
import EndToComment from "./pages/EndToComment";
import QuestionList from "./pages/QuestionList";
import NotFound from "./pages/NotFound";
import Comments from "./pages/Comments";

const flowerFlake1 = document.createElement("img");
flowerFlake1.src = "./assets/images/cherryblossom1.png";

const flowerFlake2 = document.createElement("img");
flowerFlake2.src = "./assets/images/cherryblossom2.png";

const flowerFlake3 = document.createElement("img");
flowerFlake3.src = "./assets/images/cherryblossom3.png";

const springEffect = [flowerFlake1, flowerFlake2, flowerFlake3];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth")) === true) {
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
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <GlobalStyle />
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/question/:questionId" element={<Question />}></Route>
          <Route path="/question/:questionId/comments" element={<Comments />}></Route>
          <Route
            path="/questionlist/:userId"
            element={<QuestionList />}
          ></Route>
          <Route
            path="/createquestion/:userId"
            element={<CreateQuestion />}
          ></Route>
          <Route path="/mypage/:userId" element={<MyPage />}></Route>
          <Route
            path="/loginforcomment/:id"
            element={<LoginForComment />}
          ></Route>
          <Route
            path="/forentercomment/:id"
            element={<ForEnterComment />}
          ></Route>
          <Route
            path="/loadingtologinforcomment/:id"
            element={<LoadingToLoginForComment />}
          ></Route>
          <Route path="/endtocomment" element={<EndToComment />}></Route>
          <Route path="/newquestion" element={<NewQuestion />}></Route>
          <Route path="/pointcheck" element={<PointCheck />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
