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

function DetailFeed({ show, handleClose, feedsId }) {
  const [state, dispatch] = useContext(UserContext);
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const response = await API.get(`/comment/${feedsId.id}`);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Load comment
  useEffect(() => {
    loadComments();
  }, [feedsId]);

  if (
    feedsId &&
    Object.keys(feedsId).length === 0 &&
    Object.getPrototypeOf(feedsId) === Object.prototype
  ) {
    return <div></div>;
  } else {
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
                src={process.env.PUBLIC_URL + path + `${feedsId.fileName}`}
                alt="Detail"
                className="gambarfeed"
              />
            </div>
            <div className="detail-lain">
              <div className="detail-uploader">
                <div className="foto-uploader">
                  <img
                    src={
                      process.env.PUBLIC_URL + path + `${feedsId.user.image}`
                    }
                    alt="Uploader"
                  />
                </div>
                <div className="data-uploader">
                  <Link to={`/profile/${feedsId.user.id}`}>
                    <p className="nama-uploader">{feedsId.user.fullName}</p>
                  </Link>
                  <p className="caption-uploader">{feedsId.caption}</p>
                </div>
              </div>
              {comments.map((comment) => (
                <div className="detail-komen" key={comment.id}>
                  <div className="foto-komen">
                    <img
                      src={
                        process.env.PUBLIC_URL + path + `${comment.user.image}`
                      }
                      alt="Komenter"
                    />
                  </div>
                  <div className="data-komen">
                    <Link to={`/profile/${comment.user.id}`}>
                      <p className="nama-komen">{comment.user.fullName}</p>
                    </Link>
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
                  <p>{feedsId.like} Like</p>
                </div>
                <div className="kolom-komentar">
                  <input type="text" placeholder="Comment" />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailFeed;
