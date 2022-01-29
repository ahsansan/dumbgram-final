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

function DetailFeed(props) {
  const { show, handleClose } = props;

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
              src={process.env.PUBLIC_URL + "/images/photos/Detail.png"}
              alt="Detail"
              className="gambarfeed"
            />
          </div>
          <div className="detail-lain">
            <div className="detail-uploader">
              <div className="foto-uploader">
                <img
                  src={process.env.PUBLIC_URL + "/images/photos/Zayn.png"}
                  alt="Uploader"
                />
              </div>
              <div className="data-uploader">
                <Link to="/profile">
                  <p className="nama-uploader">Zayn</p>
                </Link>
                <p className="caption-uploader">To begin again</p>
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
                <p>127.135 Like</p>
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
