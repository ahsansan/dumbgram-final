// Hooks
import { useState, useEffect, useContext } from "react";
// Bootstrap
import { Modal } from "react-bootstrap";
// Custom CSS
import "../styles/components/detailfeed.css";
// FonstAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
const path = "http://localhost:5000/uploads/";

function DetailFeed(props) {
  const { show, handleClose, feedsid } = props;

  const [state, dispatch] = useContext(UserContext);
  const [users, setUsers] = useState({});

  const loadUsers = async () => {
    try {
      const response = await API.get(`/user/${feedsid.user.id}`);
      setUsers(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const comments = [
    {
      name: "Lisa",
      photo: "/images/photos/Lisa.png",
      comment: "Gokil sih bro",
    },
    {
      name: "Ahsan",
      photo: "/images/photos/Ahsan.jpg",
      comment: "Keren tempatnya kak",
    },
  ];

  // Load user
  useEffect(() => {
    loadUsers();
  }, [feedsid]);

  return (
    <div>
      {/* modal detail feed */}
      <Modal
        show={show}
        onHide={handleClose}
        className="modalleft"
        dialogClassName="info-modal-feed"
      >
        <div className="detail-container">
          <div className="detail-image">
            <img
              src={process.env.PUBLIC_URL + path + `${feedsid.fileName}`}
              alt="Detail"
              className="gambarfeed"
            />
          </div>
          <div className="detail-lain">
            <div className="detail-uploader">
              <div className="foto-uploader">
                <img
                  src={process.env.PUBLIC_URL + path + `${feedsid.user.image}`}
                  alt="Uploader"
                />
              </div>
              <div className="data-uploader">
                <Link to={`/profile/${feedsid.user.id}`}>
                  <p className="nama-uploader">{feedsid.user.fullName}</p>
                </Link>
                <p className="caption-uploader">{feedsid.caption}</p>
              </div>
            </div>
            {comments.map((comment, index) => (
              <div className="detail-komen" key={index}>
                <div className="foto-komen">
                  <img
                    src={process.env.PUBLIC_URL + `${comment.photo}`}
                    alt="Komenter"
                  />
                </div>
                <div className="data-komen">
                  <p className="nama-komen">{comment.name}</p>
                  <p className="caption-komen">{comment.comment}</p>
                </div>
              </div>
            ))}
            <div className="reaction-container">
              <div className="icon-icon">
                <FontAwesomeIcon
                  className="card-icon heart hearts"
                  icon={faHeart}
                  size="lg"
                />
                <FontAwesomeIcon
                  className="card-icon heart hearts"
                  icon={faComment}
                  size="lg"
                />
                <FontAwesomeIcon
                  className="card-icon heart hearts"
                  icon={faPaperPlane}
                  size="lg"
                />
              </div>
              <div className="likers">
                <p>{feedsid.like} Like</p>
              </div>
              <div className="kolom-komentar">
                <input type="text" placeholder="Comment" />
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <img src={process.env.PUBLIC_URL + `${props.feed.image}`} key={props.feed.id} alt="Gambar Feed" />
        </div> */}
      </Modal>
    </div>
  );
}

export default DetailFeed;
