import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
import SignUp from './Pages/SignupPage';
import Profile from './Pages/ProfilePage';
import Setting from './Pages/SettingsPage';
import LoginNavbar from "./Components/LoginNavbar";
import Navbar from "./Components/NavBar";
import { useAuthStore } from "./store/useAuthStore";
import {useThemeStore} from "./store/useThemeStore";
import { useEffect } from "react";
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const authPages = ["/login", "/","/signup"];
  const isLoginPage = authPages.includes(location.pathname);

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme}=useThemeStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth && !authUser && !isLoginPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {isLoginPage ? <LoginNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
