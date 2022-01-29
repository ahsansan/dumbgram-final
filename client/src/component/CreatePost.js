// Import CSS
import "../styles/components/createpost.css";

// Oas
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function CreatePost() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="create-post-container" data-aos="fade-up">
      <h1>Create Post</h1>
      <form>
        <div>
          <label for="input-photo-video" className="post-upload-photo-button">
            <p>Upload Photos or Video</p>
          </label>
          <input type="file" id="input-photo-video" hidden />
        </div>
        <div>
          <textarea
            name="caption"
            id="caption"
            className="caption-textarea"
            placeholder="Caption"
          ></textarea>
        </div>
        <div className="upload-button-container">
          <button className="upload-button">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
