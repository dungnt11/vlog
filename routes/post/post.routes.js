const app = require("express");
const postQuestion = app.Router();

const authJwt = require("../../midderware/jwtAuth.midderware");

/**
 * controller ASK
 */
const postController = require("../../controller/ask.controller");

/**
 * @ROUTE GET ask/all
 * @DECS get all bai viet cua nguoi hoi
 * @ACCESS public
 */
postQuestion.get("/all", postController.getAllPost);

/**
 * @ROUTE GET ask/:id
 * @DECS get all bai viet cua nguoi hoi theo id bai viet
 * @ACCESS public
 */
postQuestion.get("/:id", postController.getAllPostById);

/**
 * @ROUTE PUT ask/post/:id
 * @Param { vote: 1 }
 * @DECS vote theo id cua post
 * @ACCESS private
 */
postQuestion.put("/vote/:id", authJwt, postController.voteAskById);

module.exports = postQuestion;
