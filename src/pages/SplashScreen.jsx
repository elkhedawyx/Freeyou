import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigate("/"); // بعد انتهاء اللوجو، يروح لصفحة تسجيل الدخول
    }, 3000); // مدة الظهور 3 ثواني

    return () => clearTimeout(timer);
  }, [navigate]);

  return isVisible ? (
    <div className="splash-container">
      <img src="/logo.png" alt="Logo" className="splash-logo" />
    </div>
  ) : null;
};

export default SplashScreen;
