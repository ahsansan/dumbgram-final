// Custom Css
import "../styles/components/profile.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faHome,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
// React Router Dom
import { Link, useParams } from "react-router-dom";
// React
import { useState, useEffect } from "react";
// Import API
import { API } from "../config/api";

function LeftMenu() {
  const { id } = useParams();

  // user
  const [user, setUser] = useState([]);

  // feed
  const [feed, setFeed] = useState([]);

  // follower
  const [follower, setFollower] = useState([]);

  // following
  const [following, setFollowing] = useState([]);

  const showUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);
      setUser(response.data.data.user); // id
    } catch (error) {
      console.log(error);
    }
  };

  // feed
  const loadFeed = async () => {
    try {
      const response = await API.get(`/feedscount/${id}`);
      setFeed(response.data.data.feeds.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followers
  const loadFollower = async () => {
    try {
      const response = await API.get(`/followers/${id}`);
      setFollower(response.data.data.id_user.followers.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followings
  const loadFollowing = async () => {
    try {
      const response = await API.get(`/followings/${id}`);
      setFollowing(response.data.data.id_user.followings.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showUser();
  }, []);

  useEffect(() => {
    loadFeed();
  });

  useEffect(() => {
    loadFollower();
  });

  useEffect(() => {
    loadFollowing();
  });

  return (
    <div className="container-profile">
      <div className="left-menu-container">
        <div>
          <div className="left-menu-up">
            <div className="circle">
              <img
                src={process.env.PUBLIC_URL + `${user.image}`}
                alt="Profile"
              />
            </div>
            <div>
              <h2>{user.fullName}</h2>
              <p className="username">@{user.username}</p>
            </div>
            <div className="tombol-action">
              <ul>
                <li>
                  <Link to="/message-detail" className="login-messeges-button">
                    Messeges
                  </Link>
                </li>
                <li>
                  <Link to="/" className="login-unfollow-button">
                    Unfollow
                  </Link>
                </li>
              </ul>
            </div>
            <div className="left-menu-statsprofile">
              <div className="left-menu-count">
                <p className="head">Post</p>
                <p className="content">{feed}</p>
              </div>
              <div className="left-menu-count-center">
                <p className="head">Followers</p>
                <p className="content">{follower}</p>
              </div>
              <div className="left-menu-count">
                <p className="head">Following</p>
                <p className="content">{following}</p>
              </div>
            </div>
          </div>
          <div className="data-diri">
            <p>{user.bio}</p>
          </div>
          <div className="left-menu-down">
            <hr />
            <ul>
              <li>
                <Link to="/feed">
                  <FontAwesomeIcon className="icon-notifikasi" icon={faHome} />{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <FontAwesomeIcon
                    className="icon-notifikasi"
                    icon={faCompass}
                  />{" "}
                  Explore
                </Link>
              </li>
            </ul>
          </div>
          <div className="left-menu-down">
            <hr />
            <ul>
              <li>
                <Link to="/">
                  <FontAwesomeIcon
                    className="icon-notifikasi"
                    icon={faSignInAlt}
                  />{" "}
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
