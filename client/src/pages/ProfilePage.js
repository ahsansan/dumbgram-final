import Profile from "../component/Profile";
import Header from "../component/Header";
import Feed from "../component/Feed";

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
            <h1 className="ps-5">Hey, Zayn</h1>
            <div>
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
