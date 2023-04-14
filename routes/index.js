const router = require("express").Router();

const userRouter = require("./users");
const cardRouter = require("./cards");

const { NOT_FOUND_ERROR } = require("../utils/errorStatus");

router.use("/users", userRouter);
router.use("/cards", cardRouter);
router.use((req, res, next) => {
  next(res.status(NOT_FOUND_ERROR).send({ message: "Страница не найдена" }));
});

module.exports = router;
