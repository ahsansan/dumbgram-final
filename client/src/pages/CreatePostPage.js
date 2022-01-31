import LeftMenu from "../component/LeftMenu";
import Header from "../component/Header";
import CreatePost from "../component/CreatePost";
import { useEffect } from "react";

function CreatePostPage() {
  useEffect(() => {
    document.title = "Upload Feed | Dumbgram";
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
            <div className="d-flex justify-content-center">
              <CreatePost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
