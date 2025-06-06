import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "./AuthContext"; // adjust the path

const useTokenExpiryCheck = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch({ type: "LOGOUT" });
        window.location.href = "/login";
      } else {
        // Optional: auto logout when time is reached
        const timeLeft = decoded.exp * 1000 - Date.now();
        const timeout = setTimeout(() => {
          dispatch({ type: "LOGOUT" });
          window.location.href = "/login";
        }, timeLeft);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Token decode error", error);
      dispatch({ type: "LOGOUT" });
    }
  }, [dispatch]);
};

export default useTokenExpiryCheck;
