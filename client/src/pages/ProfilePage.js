import Profile from "../component/Profile";
import Header from "../component/Header";
import FeedProfile from "../component/FeedProfile";
import LeftMenu from "../component/LeftMenu";
import { useEffect, useContext } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// UseContext
import { UserContext } from "../context/userContext";

function ProfilePage() {
  // Context
  const [state, dispatch] = useContext(UserContext);

  const { id } = useParams();
  const yourId = state.user.id;
  const profilePage = id;

  useEffect(() => {
    document.title = "Profile | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        {yourId == profilePage ? (
          <div className="home-left">
            <LeftMenu />
          </div>
        ) : (
          <div className="home-left">
            <Profile />
          </div>
        )}
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
