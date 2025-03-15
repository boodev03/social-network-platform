import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import LandingPage from "./components/home/LandingPage";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import Search from "./components/search/Search";
import { ROUTES } from "./constants/routes";
import Layout from "./components/layout/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        {/* Các trang cần hiển thị trong Layout */}
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
