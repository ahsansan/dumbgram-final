const express = require("express");

const router = express.Router();

// Controller
const { register, login, checkAuth } = require("../controllers/auth");
const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  followers,
  followings,
} = require("../controllers/user");
const {
  addFeed,
  followingFeeds,
  feeds,
  likeFeed,
  commentsFeed,
  addComment,
  getFeed,
} = require("../controllers/feed");
const { addChat, getMessage } = require("../controllers/message");

// Middleware
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Route
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, uploadFile("image"), editUser);
router.delete("/user/:id", deleteUser);
router.get("/feedscount/:id", getFeed);
router.get("/followers/:id", followers);
router.get("/followings/:id", followings);
router.post("/feed", auth, uploadFile("fileName"), addFeed);
router.get("/feed/:id", auth, followingFeeds);
router.get("/feeds", auth, feeds);
router.post("/like", auth, likeFeed);
router.get("/comment/:id", auth, commentsFeed);
router.post("/comment/:id", auth, addComment);
router.post("/chat/:id", auth, addChat);
router.get("/chat/:id", auth, getMessage);

module.exports = router;
