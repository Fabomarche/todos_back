/* module.exports = app => {
    const images = require("../controllers/task_controller.js");

    const router = require("express").Router()

    router.post("/", images.create);
    router.get("/:id", images.findOne)

    app.use('/api/images', router)
} */