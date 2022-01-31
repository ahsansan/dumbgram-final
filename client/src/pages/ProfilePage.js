import Profile from "../component/Profile";
import Header from "../component/Header";
import FeedProfile from "../component/FeedProfile";
import { useEffect } from "react";

function ProfilePage() {
  useEffect(() => {
    document.title = "Profile | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <Profile />
        </div>
        <div className="home-right">
          <div>
            <FeedProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
