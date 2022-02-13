// Hooks
import { useState } from "react";
// Custom CSS
import "../styles/components/notification.css";
// Bootstrap
import { Modal } from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function Notification(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   Isi notifikasi
  const notifs = [
    {
      id: 1,
      photo: "/images/photos/Zayn.png",
      name: "zayn_",
      notif: "Komentar: Semangar belajarnya",
    },
    {
      id: 2,
      photo: "/images/photos/Ahsan.jpg",
      name: "kejepangan",
      notif: "Komentar: Fotomu keren sekali bro",
    },
  ];

  return (
    <div>
      <span variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className="icon-notifikasi" icon={faBell} />
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="info-modal-notification"
      >
        <div className="notif-container">
          {notifs.map((notif) => (
            <div className="notif-by-person" key={notif.id}>
              <div className="notif-photo">
                <img
                  className="notif-circlement"
                  src={process.env.PUBLIC_URL + `${notif.photo}`}
                  alt="Gambar Notif"
                />
              </div>
              <div className="notif-content">
                <p className="notif-person-name">{notif.name}</p>
                <p className="notif-person-message">{notif.notif}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
