// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isValidUsername = (uname) => {
    const regex = /^[a-zA-Z0-9\u0600-\u06FF._-]{3,}$/;
    return regex.test(uname);
  };

  const isValidPassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName) return setError("يرجى إدخال الاسم الكامل.");
    if (!isValidUsername(username)) {
      return setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل ويسمح بالأرقام والنقاط والشرطات والشرطة السفلية.");
    }
    if (!email) return setError("يرجى إدخال البريد الإلكتروني.");
    if (password !== confirmPassword) return setError("كلمتا المرور غير متطابقتين.");
    if (!isValidPassword(password)) {
      return setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير، رقم، ورمز.");
    }

    try {
      // **فحص تفرّد اليوزر**
      const usernameRef = doc(db, "usernames", username);
      const snap = await getDoc(usernameRef);
      if (snap.exists()) {
        return setError("اسم المستخدم هذا مستخدم بالفعل.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });
      await sendEmailVerification(user);

      // حفظ بيانات المستخدم
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        email,
        profileComplete: true,
        password // نص صريح (غير آمن)
      });

      // إنشاء مستند في usernames
      await setDoc(usernameRef, {
        email
      });

      alert("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="logo">C.F</h1>
        <p className="tagline">ابدأ رحلتك معنا!</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">إنشاء الحساب</button>
        </form>
        <p className="extra-links">
          لديك حساب بالفعل؟ <Link to="/">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;