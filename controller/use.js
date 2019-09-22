  const conn = require("../db/db.js")
      ///获取时间插件
  const moment = require("moment")

  showregister = (req, res) => {
      res.render("./user/register.ejs", {})
  }
  showlogin = (req, res) => {
      res.render("user/login.ejs", {})
  }
  login = (req, res) => {
      const body = req.body;
      if (body.username.trim().length == 0 || body.password.trim().length == 0) {
          return res.send({ msg: "不能为空，重新输入", status: 500 })
      }
      const sql1 = "select count(*) count1 from blogger_users where username = ? "
      conn.query(sql1, body.username, (err, data) => {
          if (err) return res.send({ msg: "查询语句失败", status: 500 })
          if (data[0].count1 != 1) return res.send({ msg: "账号输入错误", status: 501 })
          const sql2 = "select *  from blogger_users where username= ? and password = ?"
          conn.query(sql2, [body.username, body.password], (err, data) => {
              if (err) return res.send({ msg: "查询语句失败", status: 502 })
              if (data.length != 1) return res.send({ msg: "密码输入错误", status: 503 })
              req.session.user = data[0]
              req.session.islogin = true
              res.send({
                  msg: "输入正确",
                  status: 200
              })
          })
      })
  }
  register = (req, res) => {
      const body = req.body
          // console.log(body);
      if (body.username.trim().length == 0 || body.password.trim().length == 0 || body.nickname.trim().length == 0) {
          return res.send({ msg: "不能为空，重新输入", status: 500 })
      }
      const sql1 = "select count(*) as conn from blogger_users where username = ?"
      conn.query(sql1, body.username, (err, result) => {
          if (err) return res.send({ msg: "查询语句有误", status: 501 })
              //   console.log(result[0].conn);
          if (result[0].conn != 0) return res.send({ msg: "用户名存在，重新输入", status: 502 })
          const sql2 = "insert into blogger_users set ?"
          body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
          conn.query(sql2, body, (err, data) => {
              if (err) return res.send({ msg: "查询语句失败", status: 503 })
              if (data.affectedRows != 1) return res.send({ msg: "添加失败", status: 504 })
              res.send({
                  msg: "添加成功",
                  status: 200
              })
          })

      })
  }

  loginout = (req, res) => {
      req.session.destroy(function(err) {
          //   if (err) throw err;
          //   console.log('用户退出成功！');
          // 实现服务器端的跳转，这个对比于 客户端跳转
          res.redirect('/');
      });
  }





  module.exports = {
      showlogin,
      showregister,
      login,
      register,
      loginout

  }