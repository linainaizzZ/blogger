const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
const fs = require("fs")
const path = require("path")
    //引入session
const session = require("express-session")


app.use(session({
        secret: 'keyboard cat',
        // 相当于是一个加密密钥，值可以是任意字符串
        resave: false,
        // 强制session保存到session store中
        saveUninitialized: false
            // 强制没有“初始化”的session保存到storage中
    }))
    //设置ejs模板引擎
app.set("view engine", "ejs")
app.set("views", "./views/")

//设置静态托管，前面/，后面/
app.use("/node_modules", express.static("node_modules/"))

//循环注册路由模块
fs.readdir(path.join(__dirname, "router"), (err, result) => {
    result.forEach(filename => {
        let fname = path.join(__dirname, "router", filename)
        app.use(require(fname))
    })
})

// //主页
// const router1 = require("./router/index.js")
// app.use(router1)

// //用户模块
// const router2 = require("./router/user.js")
// app.use(router2)


app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");

})