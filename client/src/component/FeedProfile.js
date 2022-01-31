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
import { Link, useParams } from "react-router-dom";
// OAS
import Aos from "aos";
import "aos/dist/aos.css";
// Hooks
import { useState, useEffect, useContext } from "react";
// API and Context
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
// path
const path = "http://localhost:5000/uploads/";

function FeedProfile() {
  const { id } = useParams();
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [state, dispatch] = useContext(UserContext);
  // follow feed
  const [feeds, setFeeds] = useState([]);
  // load Feed
  const showFeeds = async () => {
    try {
      const response = await API.get(`/feedscount/${id}`);
      setFeeds(response.data.data.feeds); // id follow
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  feeds.reverse();

  // Load loadFeedFollow
  useEffect(() => {
    showFeeds();
  }, []);

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {feeds.map((feed) => (
          <div className="feed-container" key={feed.id}>
            <div className="feed-gambar">
              <img
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
        <br />
        <br />
      </Masonry>
    </div>
  );
}

export default FeedProfile;
