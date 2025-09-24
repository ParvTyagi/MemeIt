import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigateTo("/", { replace: true });
    }
  }, [authUser, navigateTo]);

  if (!authUser) return null;
  return children;
};

export default ProtectedRoute;
