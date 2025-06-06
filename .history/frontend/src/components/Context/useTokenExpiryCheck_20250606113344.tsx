import { jwtDecode } from "jwt-decode";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // adjust path

const useTokenExpiryCheck = () => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        alert("Your session has expired. Please log in again.");
        dispatch({ type: "LOGOUT" });
        window.location.href = "/login";
      } else {
        const timeout = setTimeout(() => {
          alert("Your session has expired. Please log in again.");
          dispatch({ type: "LOGOUT" });
          window.location.href = "/login";
        }, decoded.exp * 1000 - Date.now());

        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error("JWT Decode error", err);
      dispatch({ type: "LOGOUT" });
    }
  }, [dispatch]);
};

export default useTokenExpiryCheck;
