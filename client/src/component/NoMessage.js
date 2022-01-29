// Import Css
import "../styles/components/nomessage.css";
// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function NoMessage() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="no-container" data-aos="fade-up">
      <p className="no-message">No Massage</p>
    </div>
  );
}

export default NoMessage;
