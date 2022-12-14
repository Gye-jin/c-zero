import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main.js";
import Login from "./pages/log/Login.js";
import Join from "./pages/log/Join.js";
import FindPw from "./pages/log/FindPw";
import FindId from "./pages/log/FindId";
import ResetPw from "./pages/log/ResetPw";
import PersonPage from "./pages/user/PersonPage";
import Feed from "./pages/board/Feed.js";
import DetailBoard from "./pages/board/DetailBoard";
import AdminLogPage from "./pages/admin/AdminLogPage";
import AdminMailPage from "./pages/admin/AdminMailPage";
import NotFound from "./pages/etc/NotFound.js";
import UpdateUser from "./pages/log/UpdateUser";
import DeleteUser from "./pages/log/DeleteUser";
import MyPage from "./pages/user/MyPage";
import AdminMailCheck from "./pages/admin/AdminMailCheck";
function App() {
  return (
    <div>
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<Main />} />
        {/* logPage : 회원가입, 로그인, 아이디/비밀번호 찾기, 비밀번호 변경, 회원정보수정, 회원탈퇴 */}
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/resetPw" element={<ResetPw />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        {/* boardPage : 실천내용 전체, 게시글 작성, 싱세게시물 */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/detailBoard/:boardNo" element={<DetailBoard />} />
        {/* userPage : 마이페이지, 타유저페이지 */}
        <Route path="/personPage/:userId" element={<PersonPage />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* adminPage : 관리자로그페이지, 관리자메신저페이지 */}
        <Route path="/adminLogPage" element={<AdminLogPage />} />
        <Route path="/adminMailPage" element={<AdminMailPage />} />
        <Route path="/adminMailCheck" element={<AdminMailCheck />} />
        {/* 기타페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
