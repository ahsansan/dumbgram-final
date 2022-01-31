import LeftMenu from "../component/LeftMenu";
import Header from "../component/Header";
import Feed from "../component/Feed";
import { useEffect } from "react";

function FeedPage() {
  useEffect(() => {
    document.title = "Feeds | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <LeftMenu />
        </div>
        <div className="home-right">
          <div>
            <div>
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
