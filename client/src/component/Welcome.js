// useState
import { useState } from "react";
// Register
import Register from "../component/Register";
// Login
import Login from "../component/Login";

function Welcome() {
  // login
  const [isClickLogin, setClickLogin] = useState(false);
  const handleClickLogin = () => setClickLogin(!isClickLogin);

  // register
  const [isClickRegister, setClickRegister] = useState(false);
  const handleClickRegister = () => setClickRegister(!isClickRegister);

  return (
    <div>
      {/* <h1 className="lp-dumbgram">DumbGram</h1> */}
      <img
        src={process.env.PUBLIC_URL + "/images/DumbGram.png"}
        alt="DumbGram"
      />
      <h2>Share your best photos or videos</h2>
      <p>
        Join now, share your creations with another people and enjoy other
        creation.
      </p>
      <div className="lp-tombol">
        <div>
          <p>
            <button className="login-auth-button" onClick={handleClickLogin}>
              Login
            </button>{" "}
            <button
              className="register-auth-button"
              onClick={handleClickRegister}
            >
              Register
            </button>
          </p>
          {isClickLogin && <Login isOpen={isClickLogin} />}
          {isClickRegister && <Register isOpen={isClickRegister} />}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
