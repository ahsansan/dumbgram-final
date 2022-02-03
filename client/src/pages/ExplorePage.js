import LeftMenu from "../component/LeftMenu";
import Header from "../component/Header";
import ExplorePost from "../component/ExplorePost";

function ExplorePage() {
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
              <ExplorePost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
