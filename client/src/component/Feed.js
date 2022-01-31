// React Responsive Masonry
import Masonry from "react-responsive-masonry";
// Custom CSS
import "../styles/components/feed.css";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
// Import React Router DOM
import { Link } from "react-router-dom";
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

function Feed() {
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
  const [feedFollow, setFeedFollow] = useState([]);
  const [feedsId, setFeedId] = useState({});
  // load Feed
  const showFeedFollow = async () => {
    try {
      const response = await API.get(`/feed/${state.user.id}`);
      setFeedFollow(response.data.data); // id follow
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  feedFollow.reverse();

  // Load loadFeedFollow
  useEffect(() => {
    showFeedFollow();
  }, []);

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {feedFollow.map((feed) => (
          <div
            className="feed-container"
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
            <div className="feed-keterangan">
              <div className="prof-box">
                <div className="profile">
                  <img
                    src={process.env.PUBLIC_URL + path + `${feed.user.image}`}
                    className="card-profiles"
                    alt="pp"
                  />
                  <p className="post-name">
                    <Link to={`/profile/${feed.user.id}`}>
                      {feed.user.username}
                    </Link>
                  </p>
                </div>
                <div className="icon-container">
                  <FontAwesomeIcon className="card-icon" icon={faHeart} />
                  <FontAwesomeIcon className="card-icon" icon={faComment} />
                  <FontAwesomeIcon className="card-icon" icon={faPaperPlane} />
                </div>
              </div>
            </div>
            <div className="navlike">
              <div>
                <p className="like-total">{feed.like} Like</p>
              </div>
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

export default Feed;
