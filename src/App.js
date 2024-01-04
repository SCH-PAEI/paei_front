import React from "react";
import MainLayout from "./MainLayout";
import BottomNav from "./components/BottomNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Homepage.jsx";
import Club from "./pages/Clubpage.jsx";
import Post from "./pages/Post.jsx";
import Chatting from "./pages/Chatting.jsx";
import Mypage from "./pages/Mypage.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/post" element={<Post />} />
          <Route path="/chatting" element={<Chatting />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <BottomNav />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
