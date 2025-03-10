import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./EditProfileSheet.css";

const EditProfileSheet = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    bio: "",
    profilePic: "",
  });

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [auth]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      
      if (newProfilePic) {
        const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, newProfilePic);
        const downloadURL = await getDownloadURL(storageRef);
        userData.profilePic = downloadURL;
      }

      await updateDoc(userRef, userData);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setSaving(false);
  };

  return (
    <div className="edit-profile-container">
      <div className="profile-pic-container">
        <label htmlFor="profile-pic-input">
          <img
            src={userData.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="profile-pic"
          />
        </label>
        <input
          id="profile-pic-input"
          type="file"
          accept="image/*"
          onChange={(e) => setNewProfilePic(e.target.files[0])}
        />
      </div>
      <input
        type="text"
        placeholder="الاسم"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="اسم المستخدم"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <textarea
        placeholder="البايو"
        value={userData.bio}
        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
      />
      <button onClick={handleSave} disabled={saving}>
        {saving ? "جاري الحفظ..." : "حفظ"}
      </button>
    </div>
  );
};

export default EditProfileSheet;