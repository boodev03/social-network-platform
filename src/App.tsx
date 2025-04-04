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
import Feed from "./components/feed/Feed";
import PostDetail from "./components/feed/PostDetail/PostDetail";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthGuard } from "./components/auth/AuthGuard";
import { PrivateRoute } from "./components/auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthGuard />}>
            <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
            <Route
              path={ROUTES.AUTH.FORGOT_PASSWORD}
              element={<ForgotPassword />}
            />
          </Route>

          {/* Public routes */}
          <Route path={ROUTES.LANDING} element={<LandingPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.SEARCH} element={<Search />} />
              <Route path="/" element={<Feed />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
