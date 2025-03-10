// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // قد يكون بريد أو اسم مستخدم
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // تسجيل الدخول بالبريد أو اليوزر
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let email = identifier;

      // لو ما فيه @ نفترض أنه اسم مستخدم
      if (!email.includes("@")) {
        const userRef = doc(db, "usernames", identifier);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          return setError("اسم المستخدم غير صحيح.");
        }
        email = snap.data().email;
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error("Error Code:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
          setError("لا يوجد مستخدم بهذا البريد.");
          break;
        case "auth/wrong-password":
          setError("كلمة المرور غير صحيحة.");
          break;
        case "auth/invalid-email":
          setError("صيغة البريد الإلكتروني غير صحيحة.");
          break;
        case "auth/invalid-credential":
          setError("المعلومات غير صحيحة أو لم يتم ربط هذا البريد بحساب كلمة مرور.");
          break;
        default:
          setError("حدث خطأ: " + err.message);
          break;
      }
    }
  };

  // تسجيل الدخول بجوجل
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // فحص هل أكمل البيانات
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists() && docSnap.data().profileComplete) {
        navigate("/home");
      } else {
        navigate("/complete-profile");
      }
    } catch (err) {
      console.error(err);
      setError("خطأ أثناء تسجيل الدخول بجوجل: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">C.F</h1>
        <p className="tagline">تواصل بلمسة عربية جديدة</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="البريد أو اسم المستخدم"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">تسجيل الدخول</button>
        </form>
        <div className="divider">أو</div>
        <button className="google-btn" onClick={handleGoogleLogin}>
          تسجيل الدخول بجوجل
        </button>
        <p className="extra-links">
          ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;