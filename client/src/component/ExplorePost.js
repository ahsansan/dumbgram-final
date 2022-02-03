// React Responsive Masonry
import Masonry from "react-responsive-masonry";
// Custom Css
import "../styles/components/explore.css";
// OAS
import Aos from "aos";
import "aos/dist/aos.css";
// Hooks
import { useState, useEffect, useContext } from "react";
// Detail Feed
import DetailFeed from "./DetailFeed";
// API and Context
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
// path
const path = "http://localhost:5000/uploads/";

function ExplorePost() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // follow feed
  const [explore, setExplore] = useState([]);
  const [feedsId, setFeedId] = useState({});
  // load Feed
  const showFeedAll = async () => {
    try {
      const response = await API.get(`/feeds`);
      setExplore(response.data.data.feeds); // id
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  explore.reverse();

  // Load loadFeedFollow
  useEffect(() => {
    showFeedAll();
  }, []);

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {explore.map((feed) => (
          <div
            className="explore-post-container"
            key={feed.id}
            onClick={() => setFeedId(feed)}
          >
            <div className="feed-gambar">
              <img
                onClick={handleShow}
                alt="Gambar Feed"
                src={process.env.PUBLIC_URL + path + `${feed.fileName}`}
                className="images-feed"
              />
            </div>
          </div>
        ))}
        <DetailFeed show={show} handleClose={handleClose} feedsId={feedsId} />
        <br />
        <br />
      </Masonry>
    </div>
  );
}

export default ExplorePost;
