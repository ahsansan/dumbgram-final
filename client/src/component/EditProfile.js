// Import CSS
import "../styles/components/editprofile.css";

// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function EditProfile() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="edit-profile-container" data-aos="fade-up">
      <h1>Edit Profile</h1>
      <form>
        <div>
          <label for="input-photo" className="profile-upload-photo-button">
            <p>Upload Photos</p>
          </label>
          <input type="file" id="input-photo" hidden />
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            className="normal-input"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            className="normal-input"
            placeholder="Username"
          />
        </div>
        <div>
          <textarea
            type="text"
            name="bio"
            id="bio"
            className="bio-textarea"
            placeholder="Bio"
          ></textarea>
        </div>
        <div className="save-button-container">
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
