// Custom Css
import "../styles/components/profile.css";
// Bootstrap
import { Button } from "react-bootstrap";
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
import { useState, useEffect, useContext } from "react";
// UseContext
import { UserContext } from "../context/userContext";
// Import API
import { API } from "../config/api";

function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();

  // Context
  const [state, dispatch] = useContext(UserContext);

  // user
  const [user, setUser] = useState([]);

  // feed
  const [feed, setFeed] = useState([]);

  // follower
  const [follower, setFollower] = useState([]);

  // following
  const [following, setFollowing] = useState([]);

  // follow
  const [follow, setFollow] = useState([]);
  const [follows, setFollows] = useState();
  const [followsId, setFollowsId] = useState("");

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

  // Show follow
  const showFollow = async () => {
    try {
      const response = await API.get(`/follow/${state.user.id}`);
      setFollow(response.data.follow);
    } catch (error) {
      console.log(error);
    }
  };

  const followFilter = async () => {
    try {
      const find = follow.find((data) => data.idFollowings == id);
      setFollowsId(find);
      if (find) {
        setFollows(true);
      } else {
        setFollows(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Unfollow
  const handleUnfollow = async () => {
    try {
      await API.delete(`unfollow/${id}`);
      showUser();
      showFollow();
    } catch (error) {
      console.log(error);
    }
  };

  // Follow
  const handleFollow = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        idFollowers: `${state.user.id}`,
        idFollowings: id,
      });

      await API.patch("/follow", body, config);

      showUser();
      showFollow();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
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

  useEffect(() => {
    followFilter();
  }, [follow]);

  useEffect(() => {
    showFollow();
  }, []);

  return (
    <>
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
              {follows ? (
                <div className="tombol-action">
                  <ul>
                    <li>
                      <Link to="/message" className="login-messeges-button">
                        Messege
                      </Link>
                    </li>
                    <li>
                      <Button
                        onClick={handleUnfollow}
                        className="login-unfollow-button"
                      >
                        Unfollow
                      </Button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="tombol-action">
                  <ul>
                    <li>
                      <Link to="/message" className="login-messeges-button">
                        Messege
                      </Link>
                    </li>
                    <li>
                      <Button
                        onClick={handleFollow}
                        className="login-unfollow-button"
                      >
                        Follow
                      </Button>
                    </li>
                  </ul>
                </div>
              )}
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
                    <FontAwesomeIcon
                      className="icon-notifikasi"
                      icon={faHome}
                    />{" "}
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
                  <div className="logout" onClick={handleLogout}>
                    <FontAwesomeIcon
                      className="icon-notifikasi"
                      icon={faSignInAlt}
                    />{" "}
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
