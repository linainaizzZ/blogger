const moment = require("moment")
const conn = require("../db/db.js")
const marked = require("marked")
    //文章页面
articleadd = (req, res) => {
    if (!req.session.islogin) return res.redirect("/")
    res.render("article/add.ejs", {
        user: req.session.user,
        islogin: req.session.islogin
    })
}
articleinfo = (req, res) => {
        const body = req.body
        ctime = moment().format("YYYY-MM-DD HH:mm:ss")
        body.ctime = ctime
        const sql = "insert into blogger_article set ?"
        conn.query(sql, body, (err, result) => {

            if (err) return res.send({ msg: "错误了", status: 501 })
            if (result.affectedRows != 1) return res.send({ msg: "不是一个", status: 502 })
            res.send({ msg: "成功了", status: 200, insertId: result.insertId })

        })
    }
    //发布按钮，显示发布的内容
articleAsk = (req, res) => {
    let id = req.params.id
    const sql = "select * from blogger_article where id = ?"
    conn.query(sql, id, (err, result) => {
        // console.log(result);

        let htmls = marked(result[0].content)
        result[0].content = htmls
        res.render("article/info.ejs", {
            user: req.session.user,
            islogin: req.session.islogin,
            result: result[0]
        })
    })

}

showEdit = (req, res) => {
    const id = req.params.id
    const sql = "select * from blogger_article where id = ?"
    conn.query(sql, id, (err, result) => {
        res.render("article/edit.ejs", {
            user: req.session.user,
            islogin: req.session.islogin,
            result: result[0]
        })
    })
}

//点击保存按钮触发
articleEdit = (req, res) => {
        const body = req.body
        const sql = "update blogger_article set ? where id = ?"
        conn.query(sql, [body, body.id], (err, result) => {
            if (result.affectedRows != 1) return res.send({ msg: "失败", status: 500 })
            res.send({ msg: "编辑完成", status: 200 })
        })
    }
    //问题方向
questionIndex = (req, res) => {
    res.render("question/questionIndex.ejs", {
        user: req.session.user,
        islogin: req.session.islogin,
    })
}

questionAdd = (req, res) => {
    const body = req.body
    body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
    const sql = "insert into blogger_question set ?"
    conn.query(sql, body, (err, result) => {
        // console.log(result);
        if (result.affectedRows != 1) return res.send({
            msg: "添加失败",
            status: 500
        })
        res.send({ mag: "ok", status: 200, insertId: result.insertId })
    })
}
questionShow = (req, res) => {
    const id = req.params.id

    const sql = "select * from blogger_question where id = ?"
    conn.query(sql, id, (err, result) => {
        // console.log(result);
        res.render("question/questionedit.ejs", {
            user: req.session.user,
            islogin: req.session.islogin,
            result: result[0]
        })
    })
}
questionShows = (req, res) => {
    const id = req.params.id
    const sql = "select * from blogger_question where id = ?"
    conn.query(sql, id, (err, result) => {
        // console.log(result);
        res.render("question/editQues.ejs", {
            user: req.session.user,
            islogin: req.session.islogin,
            result: result[0]
        })
    })
}

questionSave = (req, res) => {
    const body = req.body
    console.log(body.content);
    const sql = "update  blogger_question set ? where id =? "

    conn.query(sql, [body, body.id], (err, result) => {
        if (result.affectedRows != 1) return res.send({ status: 500, msg: "产询失败" })
        res.send({ status: 200, msg: "ok" })

    })

}
module.exports = {
    articleadd,
    articleinfo,
    articleAsk,
    showEdit,
    articleEdit,
    questionIndex,
    questionAdd,
    questionShow,
    questionShows,
    questionSave
}