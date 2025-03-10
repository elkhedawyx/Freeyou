import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="profile-container">
      {userData && (
        <>
          <div className="profile-header">
            <img
              src={userData.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h2>{userData.name}</h2>
            <p>@{userData.username}</p>
            <p>{userData.bio}</p>
          </div>
          <button className="edit-profile-btn" onClick={() => navigate("/edit-profile")}>
            تعديل البروفايل
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;