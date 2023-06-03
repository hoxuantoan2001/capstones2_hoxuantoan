const { User } = require("../models/user.model.js");
const { Comment } = require("../models/comment.model");
const { Post } = require("../models/post.model");
const { Conversations } = require("../models/conversation.model");
// const db = require("../models/index");
const { Message } = require("../models/message.model.js");
const userController = {
  //ADD AUTHOR
  addUser: async (req, res) => {
    try {
      const newAuthor = new User(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(200).json({ statusCode: 200, content: savedAuthor });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //CRUD Comment
  addComment: async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json({ statusCode: 200, content: savedComment });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //CRUD Post
  addPost: async (req, res) => {
    const {
      user,
      price,
      area,
      length,
      wide,
      status,
      address,
      name,
      floor,
      juridical,
      interior,
      bedroom,
      bathroom,
      usablearea,
    } = req.body;
    console.log("hgds", user);
    const img_url = req.files?.map((file) => file.originalname);

    const post = new Post({
      user,
      img_url,
      price,
      area,
      length,
      wide,
      status,
      address,
      name,
      floor,
      juridical,
      interior,
      bedroom,
      bathroom,
      usablearea,
    });

    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        content: createdPost,
      });
    });
  },

  post_details: async (req, res) => {
    try {
      const detail = await Post.findById({ _id: req.params.id }).populate(
        "user"
      );

      if (detail) {
        res
          .status(200)
          .json({ statusCode: 200, message: "thành công", content: detail });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  getListPost: async (req, res) => {
    try {
      const listPost = await Post.find({});

      if (listPost.length > 0) {
        res.status(200).json({ statusCode: 200, content: listPost });
      } else {
        res.status(200).json({ statusCode: 200, message: [] });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  editPost: async (req, res) => {
    try {
      const ePost = await Post.updateOne({ _id: req.params.id }, req.body);

      if (ePost) {
        res.status(200).json({ statusCode: 200, message: "Success" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  // chat mess
  addConversation: async (req, res) => {
    try {
      const newConversation = await new Conversations({
        members: [req.body.senderId, req.body.reciverId],
      });
      const savedConversation = await newConversation.save();
      res.status(200).json({ statusCode: 200, content: savedConversation });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  findUserConversation: async (req, res) => {
    console.log("hágdgsa", req.params.userId);
    try {
      const conversation = await Conversations.find({
        members: { $in: [req.params.userId] },
      });
      console.log("hágdgsa", conversation);

      res.status(200).json({ statusCode: 200, content: conversation });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  findTwoConversation: async (req, res) => {
    try {
      const conversation = await Conversations.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addnewMessage: async (req, res) => {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get

  getMessage: async (req, res) => {
    console.log("idconversation", req.params.conversationId);
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json({ content: messages });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const dPost = await Post.findByIdAndRemove({ _id: req.params.id });

      if (dPost) {
        res.status(200).json({ statusCode: 200, message: "Success" });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Get API Post join User

  getUserPosts: async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.params.id }).populate(
        "Post"
      );
      if (userData) {
        res.status(200).json({ statusCode: 200, message: userData });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  // searchUserPosts: async (req, res) => {
  //   try {
  //     const userData = await User.aggregate([
  //       {
  //         $match: { _id: req.params.id }
  //       },

  //       {
  //         $lookup: {
  //           from: "posts",
  //           localField: "_id",
  //           foreignField: "user",
  //           as: "user_posts",
  //         },
  //       },
  //     ]);

  //     if (userData.length > 0) {
  //       res.status(200).json({ statusCode: 200, message: userData });
  //     } else {
  //       res.status(404).json({ statusCode: 404, message: "User not found" });
  //     }
  //   } catch (err) {
  //     res.status(500).json(err); //HTTP REQUEST CODE
  //   }
  // },

  //Search
  searchByKey: async (req, res) => {
    try {
      const title = await Post.find({
        // Search không biệt in hoa/thường
        name: { $regex: new RegExp(req.params.key, "i") },
        // $or: [{ name: { $regex: req.params.key } }],
      });

      if (title) {
        res.status(200).json({ statusCode: 200, title });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  getPosts: async (req, res) => {
    try {
      const postData = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_id",
          },
        },
      ]);
      if (postData) {
        res.status(200).json({ statusCode: 200, message: postData });
      } else {
        res.status(400).json({ statusCode: 400, message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //Filter price
  getProductsByPrice: async (req, res) => {
    try {
      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_VALUE;
      const filteredProducts = await Post.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
      res.status(200).json({ products: filteredProducts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  findUser: async (req, res) => {
    try {
      // console.log("req", req.body);
      // const newUser = new User(req.body);

      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        res.status(200).send({ statusCode: 200, content: user });
      }

      // .then((user) => {
      //   if (user) {
      //     res.status(200).send({ statusCode: 200, message: user.name });
      //   }
      // })
      // .catch((error) => {
      //   res.status(404).send({ statusCode: 404, message: error.message });
      // });
    } catch (err) {
      res.status(500).send(err); //HTTP REQUEST CODE
    }
  },
};
module.exports = userController;
