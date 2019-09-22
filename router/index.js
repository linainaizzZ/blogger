const express = require("express")
const router = express.Router()

//引入controller模块
const ctrl = require("../controller/index.js")
router.get("/", ctrl.showindex)



module.exports = router