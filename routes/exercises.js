const router = require("express").Router();
const Exercise = require("../models/Exercise");

/**
 * @api {get} /exercises Request a list of exercises
 * @apiName GetExercises
 * @apiGroup Exercises
 * @apiSuccess {Object[]} exercises array of exercise objects
 */
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json({ err }));
});

/**
 * @api {get} /exercises/:id Request a single exercise
 * @apiName GetExercise
 * @apiGroup Exercises
 * @apiParam {String} id identifier of the exercise
 * @apiSuccess {String} _id unique identifier of the exercise
 * @apiSuccess {String} username username of the exercise creator
 * @apiSuccess {String} description description of the exercise
 * @apiSuccess {Number} duration duration of the exercise
 * @apiSuccess {String} createdAt exercise created at
 * @apiSuccess {String} updatedAt exercise updated at
 * @apiSuccess {Number} __v miscellaneous
 */
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json({ err }));
});

/**
 * @api {delete} /exercises/:id Delete a single exercise
 * @apiName DeleteExercise
 * @apiGroup Exercises
 * @apiParam {String} id identifier of the exercise
 * @apiSuccess {String} msg message confirming the deletion
 */
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: `exercise ${req.params.id} deleted!` }))
    .catch(err => res.status(400).json({ err }));
});

/**
 * @api {put} /exercises/:id Update a single exercise
 * @apiName UpdateExercise
 * @apiGroup Exercises
 * @apiParam {String} id identifier of the exercise
 * @apiSuccess {String} _id unique identifier of the exercise
 * @apiSuccess {String} username username of the exercise creator
 * @apiSuccess {String} description description of the exercise
 * @apiSuccess {Number} duration duration of the exercise
 * @apiSuccess {String} createdAt exercise created at
 * @apiSuccess {String} updatedAt exercise updated at
 * @apiSuccess {Number} __v miscellaneous
 */
router.route("/update/:id").put((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      let { username, description, duration, date } = req.body;
      if (username) exercise.username = username;
      if (description) exercise.description = description;
      if (duration) exercise.duration = duration;
      if (date) exercise.date = Date.parse(date);

      exercise
        .save()
        .then(() => res.json({ exercise }))
        .catch(err => res.status(400).json({ err }));
    })
    .catch(err => res.status(400).json({ err }));
});

/**
 * @api {post} /exercises/add Add a single exercise
 * @apiName AddExercise
 * @apiGroup Exercises
 * @apiParam {String} username username of the exercise creator
 * @apiParam {String} description description of the exercise
 * @apiParam {Number} duration duration of the exercise
 * @apiParam {Date} date date of the exercise
 * @apiSuccess {String} msg message confirming the addition
 */
router.route("/add").post((req, res) => {
  const { username, description, duration, date } = req.body;
  const newExercise = new Exercise({
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date)
  });
  newExercise
    .save()
    .then(() => res.json({ msg: `exercise added` }))
    .catch(err => res.status(400).json({ err }));
});

module.exports = router;
