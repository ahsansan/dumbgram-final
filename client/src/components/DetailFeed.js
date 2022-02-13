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

function DetailFeed({ show, handleClose, feedsId, showFeedFollow }) {
  const [state] = useContext(UserContext);
  const [comments, setComments] = useState([]);

  // load comment
  const loadComments = async () => {
    try {
      const response = await API.get(`/comment/${feedsId.id}`);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // add comment
  const [form, setForm] = useState({
    comment: "",
  });

  const { comment } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // enter comment
  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        ...form,
        idFeed: `${feedsId.id}`,
        idUser: `${state.user.id}`,
      });

      await API.post("/comment", body, config);

      loadComments();
      setForm({
        comment: "",
      });
    }
  };

  // Like
  const [likeUser, setLikeUser] = useState([]);
  const [likes, setLike] = useState();

  const loadLike = async () => {
    try {
      const response = await API.get(`/like/${state.user.id}`);
      setLikeUser(response.data.like);
    } catch (error) {
      console.log(error);
    }
  };

  const likeFilter = async () => {
    try {
      const find = likeUser.find((data) => data.idFeed == feedsId.id);
      if (find) {
        setLike(true);
      } else {
        setLike(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = (event) => {
    const id = event.target.getAttribute("content");
    like(id);
  };

  const like = async (id) => {
    try {
      const body = JSON.stringify({ id });
      const headers = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await API.post("/like", body, headers);

      showFeedFollow();
      loadLike();
    } catch (error) {
      console.log(error);
    }
  };

  // Load loadLike
  useEffect(() => {
    loadLike();
  }, [showFeedFollow]);

  // Load likeFilter
  useEffect(() => {
    likeFilter();
  }, [likeUser]);

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
              <div className="komen-container">
                {comments.map((comment) => (
                  <div className="detail-komen" key={comment.id}>
                    <div className="foto-komen">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          path +
                          `${comment.user.image}`
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
              </div>
              <div className="reaction-container">
                <div className="icon-icon">
                  {likes ? (
                    <FontAwesomeIcon
                      className="card-icon text-danger"
                      onClick={handleLike}
                      icon={faHeart}
                      content={feedsId.id}
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="card-icon"
                      onClick={handleLike}
                      icon={faHeart}
                      content={feedsId.id}
                      size="lg"
                    />
                  )}
                  <label htmlFor="comment">
                    <FontAwesomeIcon
                      className="card-icon"
                      icon={faComment}
                      size="lg"
                    />
                  </label>
                  <FontAwesomeIcon
                    className="card-icon"
                    icon={faPaperPlane}
                    size="lg"
                  />
                </div>
                <div className="likers">
                  <p>{feedsId.like} Like</p>
                </div>
                <div className="kolom-komentar">
                  <input
                    value={comment}
                    id="comment"
                    onChange={handleOnChange}
                    name="comment"
                    type="text"
                    placeholder="Comment"
                    autoComplete="off"
                    onKeyPress={handleSubmit}
                    required
                  />
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
