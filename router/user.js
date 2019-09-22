const express = require("express")
const router = express.Router()


// 引入controller模块
const ctrl = require("../controller/use.js")
    //注册页面的显示
router.get("/register", ctrl.showregister)
    //登录页面的渲染
router.get("/login", ctrl.showlogin)
    //注册逻辑的实现
router.post("/register", ctrl.register)
    //登录逻辑的实现
router.post("/login", ctrl.login)


router.get("/loginout", ctrl.loginout)

module.exports = router