// src/pages/CompleteProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  EmailAuthProvider,
  linkWithCredential
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./CompleteProfile.css";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // حساب جوجل
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    navigate("/");
    return null;
  }

  const isValidUsername = (uname) => {
    const regex = /^[a-zA-Z0-9\u0600-\u06FF._-]{3,}$/;
    return regex.test(uname);
  };

  const isValidPassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidUsername(username)) {
      return setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل ويسمح بالأرقام والنقاط والشرطات والشرطة السفلية.");
    }
    if (password !== confirmPassword) {
      return setError("كلمتا المرور غير متطابقتين.");
    }
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

      const email = user.email;
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        profileComplete: true,
        password // نص صريح (غير آمن)
      });

      // خريطة username → email
      await setDoc(usernameRef, { email });

      alert("تم إكمال الملف الشخصي بنجاح!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إكمال الملف الشخصي: " + err.message);
    }
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-box">
        <h2>إكمال الملف الشخصي</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSave}>
          <label>اسم المستخدم:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>كلمة المرور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>تأكيد كلمة المرور:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">حفظ</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;