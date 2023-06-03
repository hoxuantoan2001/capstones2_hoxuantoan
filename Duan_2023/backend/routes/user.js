const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const router = require("express").Router();
const verify = require("../middleware/index");
const path = require("path");
const fs = require("fs");
//ADD AUTHOR

router.post("/dsfs", userController.addUser);
router.post("/signup", verify.verifySignUp2, authController.signup);
router.post("/signin/", authController.signin);
router.post("/comment", verify.authJwt2, userController.addComment);

//CRUD Post
// router.post(
//   "/post",
//   verify.authJwt2,
//   upload.single("img_url"),
//   userController.addPost
// );
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router
  .route("/post")
  .post(verify.authJwt2, upload.array("img_url"), userController.addPost);
router.get("/post", userController.getListPost);
router.get("/post:id", userController.post_details);
router.put("/post:id", verify.authJwt2, userController.editPost);
router.delete("/post:id", verify.authJwt2, userController.deletePost);
router.get("/post/user:id", verify.authJwt2, userController.getPosts);
//Search
// router.get("/search/:key", userController.search);
router.get("/conversation/:userId", userController.findUserConversation);
//Filter
router.get("/products/filter/price", userController.getProductsByPrice);
router.post("/user/conversation", userController.addConversation);
router.get("/:id", userController.findUser);

router.get(
  "/find/:firstUserId/:secondUserId",
  userController.findTwoConversation
);
router.post("/user/message", userController.addnewMessage);
router.get("/user/message:conversationId", userController.getMessage);

module.exports = router;
