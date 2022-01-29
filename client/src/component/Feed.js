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
import { useState, useEffect } from "react";
// Detail Feed
import DetailFeed from "./DetailFeed";

function Feed() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Data Feed
  const imagesFeed = [
    {
      id: 1,
      image: "/images/photos/Rectangle 6.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "126.100 Like",
    },
    {
      id: 2,
      image: "/images/photos/Rectangle 3.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "156.100 Like",
    },
    {
      id: 3,
      image: "/images/photos/Rectangle 10.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "127.135 Like",
    },
    {
      id: 4,
      image: "/images/photos/Rectangle 5.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "128.135 Like",
    },
    {
      id: 5,
      image: "/images/photos/Rectangle 9.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "169.235 Like",
    },
    {
      id: 6,
      image: "/images/photos/Rectangle 8.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "199.235 Like",
    },
    {
      id: 7,
      image: "/images/photos/Rectangle 4.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "118.235 Like",
    },
    {
      id: 8,
      image: "/images/photos/Rectangle 12.png",
      uploader: "zayn",
      ppuploader: "/images/photos/Zayn.png",
      like: "118.235 Like",
    },
  ];

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {imagesFeed.map((feed) => (
          <div className="feed-container" key={feed.id}>
            <div className="feed-gambar">
              <img
                onClick={handleShow}
                alt="Gambar Feed"
                src={process.env.PUBLIC_URL + `${feed.image}`}
                className="images-feed"
              />
            </div>
            <div className="feed-keterangan">
              <div className="prof-box">
                <div className="profile">
                  <img
                    src={process.env.PUBLIC_URL + `${feed.ppuploader}`}
                    className="card-profiles"
                    alt="pp"
                  />
                  <p className="post-name">
                    <Link to="/profile">{feed.uploader}</Link>
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
                <p className="like-total">{feed.like}</p>
              </div>
            </div>
          </div>
        ))}
        <DetailFeed show={show} handleClose={handleClose} />
      </Masonry>
    </div>
  );
}

export default Feed;
