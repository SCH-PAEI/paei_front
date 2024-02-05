import React, { useState, createContext } from "react";
import MainLayout from "./MainLayout";
import BottomNav from "./components/BottomNav";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import Login from "./pages/Login";
import UserInfo from "./components/UserInfo";
import Home from "./pages/Homepage.jsx";
import Club from "./pages/Clubpage.jsx";
import Post from "./pages/Post.jsx";
import Chatting from "./pages/Chatting.jsx";
import Mypage from "./pages/Mypage.jsx";
import Register from "./pages/Register.jsx";

// UserContext 생성
export const UserContext = createContext(null);

const App = () => {
  // 사용자 ID를 저장하는 상태 생성
  const [userID, setUserID] = useState(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<AppInner />} />{" "}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

const AppInner = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/club" element={<Club />} />
        <Route path="/post" element={<Post />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/userinfo/:userID" element={<UserInfo />} />
      </Routes>
      {location.pathname !== "/post" &&
        location.pathname !== "/" &&
        location.pathname !== "/register" &&
        !location.pathname.startsWith("/userinfo") && <BottomNav />}
    </MainLayout>
  );
};

export default App;
