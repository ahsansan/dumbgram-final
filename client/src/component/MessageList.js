// Custom CSS
import "../styles/components/messagelist.css";
// React Router Dom
import { Link } from "react-router-dom";

function MessageList() {
  const messages = [
    {
      id: 1,
      photo: "/images/photos/Zayn.png",
      name: "Zayn",
      message: "Halo Lisa",
    },
    {
      id: 2,
      photo: "/images/photos/Ahsan.jpg",
      name: "Ahsan",
      message: "Anyonghaseyo Lisa",
    },
  ];
  return (
    <div className="dm-container">
      {messages.map((msg) => (
        <div className="dm-by-person" key={msg.id}>
          <div className="dm-photo">
            <img
              className="dm-circlement"
              src={process.env.PUBLIC_URL + `${msg.photo}`}
              alt="Profile"
            />
          </div>
          <div className="dm-content">
            <Link to="/message-detail">
              <p className="dm-person-name">{msg.name}</p>
              <p className="dm-person-message">{msg.message}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
