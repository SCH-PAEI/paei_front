import React from "react";
import MainLayout from "./MainLayout";
import BottomNav from "./components/BottomNav";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import UserInfo from "./components/UserInfo";
import Home from "./pages/Homepage.jsx";
import Club from "./pages/Clubpage.jsx";
import Post from "./pages/Post.jsx";
import Chatting from "./pages/Chatting.jsx";
import Mypage from "./pages/Mypage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AppInner /> {/* AppInner 컴포넌트로 분리 */}
    </BrowserRouter>
  );
};

// AppInner 컴포넌트 추가
const AppInner = () => {
  const location = useLocation(); // BrowserRouter 안에서 호출

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/club" element={<Club />} />
        <Route path="/post" element={<Post />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
      {location.pathname !== "/post" && location.pathname !== "/" && (
        <BottomNav />
      )}
    </MainLayout>
  );
};

export default App;
