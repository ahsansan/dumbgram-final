// Import Css
import "../styles/components/messagezayn.css";
// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function MessageZayn() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="detail-dm-container" data-aos="fade-up">
      <div className="detail-dm-by-person">
        <div className="detail-dm-photo">
          <img
            className="detail-dm-circlement"
            src={process.env.PUBLIC_URL + "/images/photos/Zayn.png"}
            alt="Orang"
          />
        </div>
        <div className="detail-dm-content">
          <p className="detail-dm-person-message">Halo Lisa</p>
        </div>
      </div>
      <div className="dm-reply">
        <textarea
          type="text"
          className="dm-textarea"
          placeholder="Send Messages"
        ></textarea>
      </div>
    </div>
  );
}

export default MessageZayn;
