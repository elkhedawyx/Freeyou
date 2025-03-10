import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"; // استدعاء البحث
import "./Explore.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-container">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index} className="user-card">
              <img
                src={user.profilePicture || "/default-avatar.png"}
                alt="User"
                className="user-avatar"
              />
              <p>{user.username}</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;