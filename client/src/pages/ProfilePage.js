import Profile from "../component/Profile";
import Header from "../component/Header";
import FeedProfile from "../component/FeedProfile";

function ProfilePage() {
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
