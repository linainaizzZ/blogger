const conn = require("../db/db.js")

let showindex = (req, res) => {
    const pageSize = 5;
    const nowpage = Number(req.query.page) || 1

    const sql = `select blogger_article.id,blogger_article.title,blogger_article.ctime,blogger_users.nickname from blogger_article LEFT JOIN blogger_users on blogger_users.id= blogger_article.authorId  order by  blogger_article.id desc  LIMIT ${(nowpage - 1) * pageSize},${pageSize}; select count(*) as count from blogger_article`


    conn.query(sql, (err, result) => {
        const moreSize = Math.ceil(result[1][0].count / pageSize);

        res.render("index.ejs", {
            user: req.session.user,
            islogin: req.session.islogin,
            data: result[0],
            moreSize: moreSize,
            nowpage: nowpage
        })
    })



}

module.exports = {
    showindex
}