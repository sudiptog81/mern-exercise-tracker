const router = require("express").Router();
const User = require("../models/User");

/**
 * @api {get} /users Request a list of users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiSuccess {Object[]} users array of user objects
 */
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ err }));
});

/**
 * @api {post} /users/add Add a single user
 * @apiName AddUser
 * @apiGroup Users
 * @apiParam {String} username username of the user
 * @apiSuccess {String} msg message confirming addition of an user
 */
router.route("/add").post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json({ msg: `user ${req.body.username} added` }))
    .catch(err => res.status(400).json({ err }));
});

module.exports = router;
