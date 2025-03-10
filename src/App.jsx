// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreatePost from "./pages/CreatePost";
import Direct from "./pages/Direct";
import Profile from "./pages/Profile";
import EditProfileSheet from "./pages/EditProfileSheet";
import Activity from "./pages/Activity";
import MainLayout from "./components/MainLayout";

function App() {
  const userData = {
    username: "JohnDoe",
    bio: "I love coding!",
  };

  return (
    <Router>
      <Routes>
        {/* صفحات المصادقة */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* باقي الصفحات داخل MainLayout مع Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/direct" element={<Direct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfileSheet userData={userData} />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;