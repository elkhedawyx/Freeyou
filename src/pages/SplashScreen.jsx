import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreen.css"; // هنضيف ملف CSS للتحكم في الأنميشن

function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000); // بعد 2 ثانية، نبدأ في الإخفاء
    setTimeout(() => navigate("/"), 2500); // بعد 2.5 ثانية، ننتقل لصفحة تسجيل الدخول
  }, [navigate]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img src="/logo.png" alt="Logo" className="logo" />
    </div>
  );
}

export default SplashScreen;
