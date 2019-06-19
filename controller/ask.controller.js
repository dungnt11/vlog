// model
const question = require("../model/question.model");
const voteModel = require("../model/vote.model");
//rule
module.exports = {
  /**
   * @DECS tao bai viet
   * @access private
   */
  article: (req, res) => {
    let _qs = {
      ...req.body,
      authorPost: req.user.id
    };
    let ask = new question(_qs);
    ask
      .save()
      .then(() => res.json({ msg: "saved !" }))
      .catch(err => res.status(500).json({ err }));
  },
  getAllPost: (req, res) => {
    /**
     * @DECS lay post cua phan ask
     * @ROUTE ask/all
     */
    question
      .find()
      .then(post => res.json({ post }))
      .catch(err => res.status(404).json({ err: "post not found !" + err }));
  },
  getAllPostById: (req, res) => {
    const idAsk = req.params.id;
    question
      .findById(idAsk)
      .exec()
      .then(post =>
        res.json({
          status: "success",
          data: post
        })
      )
      .catch(err => {
        res.status(404).json({
          status: "fail",
          err
        });
      });
  },
  voteAskById: async (req, res) => {
    const idUserVote = req.user.id;
    const idQuestion = req.params.id; // id question

    function pushQuestion(id) {
      /**
       * @desc push id vote to question model
       * @params id vote sau khi tao moi
       */
      if (id) {
        question
          .findOneAndUpdate(idQuestion, { vote: id }, { new: true })
          .then(ques => {
            console.log(ques);
            return res.json({ msg: ques });
          });
      }
    }

    function createVote() {
      console.log(idUserVote);
      let newVote = new voteModel({
        userVote: idUserVote
      });

      return newVote
        .save()
        .then(vote => {
          console.info("tao vote thanh cong " + vote);
          return pushQuestion(vote._id);
        })
        .catch(err => {
          console.warn("create vote that bai " + err);
          return;
        });
    }

    function updateVoteModel(idVoteUpdate) {
      if (idVoteUpdate) {
        voteModel.findById(idVoteUpdate).then(vote => {
          let checkUserVote = vote.userVote.filter(vote => {
            // vote --> userVote ( votemodel ) --> objectID --> string de so sanh
            return String(vote) === idUserVote;
          });
          if (!checkUserVote) {
            // neu user chua vote
            vote.userVote.push(idUserVote);
            vote
              .save()
              .then(_v => {
                console.info("cap nhat vote thanh cong" + _v);
                return res.json({ msg: "vote success" });
              })
              .catch(err => {
                console.info("cap nhat vote that bai " + err);
                return res.status(500).json({ err: "vote fail" });
              });
          } else {
            return res.status(400).json({ err: "user voted" });
          }
        });
      }
    }
    // tim bai viet
    await question
      .findById(idQuestion)
      .then(ques => {
        if (!ques.vote) {
          // neu chua co vote thi tao moi
          // vote lan dau
          console.info("can tao vote cho lan dau");
          createVote();
        } else {
          // neu co vote roi thi tang vote
          // vote nhung lan sau
          console.info("can cap nhat vote cho lan sau");
          updateVoteModel(ques.vote);
        }
      })
      .catch(err => {
        console.log("err vote controller" + err);
        return res.status(404).json({ err: "not found id vote !" });
      });
  }
};
