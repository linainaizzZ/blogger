const express = require("express")
const router = express.Router()


const ctrl = require("../controller/article.js")
    //发表文章
router.get("/article/add", ctrl.articleadd)
router.post("/article/info", ctrl.articleinfo)
router.get("/article/info/:id", ctrl.articleAsk)
router.get("/article/edit/:id", ctrl.showEdit)
router.post("/article/edit", ctrl.articleEdit)
    //发表问题

router.get("/article/question", ctrl.questionIndex)
router.post("/question/add", ctrl.questionAdd)
router.get("/question/show/:id", ctrl.questionShow)
router.get("/question/shows/:id", ctrl.questionShows)
router.post("/question/save", ctrl.questionSave)

module.exports = router