const express = require("express");
const router = express.Router();
const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/signup", (req, res) => {
  let { user_email_address, user_password } = req.body;
  if (user_email_address && user_password) {
    const salt = bcrypt.genSaltSync(8);
    user_password = bcrypt.hashSync(user_password, salt);
    let db = `
    SELECT * FROM user_login 
    WHERE user_email = "${user_email_address}"
    `;
    connection.query(db, function (err, data) {
      if (data.length > 0) {
        res.end("email sudah ada");
      } else {
        let ins_db = `INSERT INTO user_login (user_email, user_password) VALUES ('${user_email_address}', '${user_password}');`;
        connection.query(ins_db, function (err, data) {
          res.end("yey berhasil");
        });
      }
    });
  } else {
    res.end("Input woi");
  }
});

router.post("/signin", (req, res) => {
  let { user_email_address, user_password } = req.body;
  if (user_email_address && user_password) {
    db = `
    SELECT * FROM user_login 
    WHERE user_email = "${user_email_address}"
    `;
    connection.query(db, function (err, data) {
      if (data.length > 0) {
        console.log(data[0].user_password);
        const passwordIsValid = bcrypt.compareSync(user_password, data[0].user_password);
        if (passwordIsValid) {
          res.end("login");
        } else {
          res.end("salah password");
        }
        // if (data[0].user_password == user_password) {
        //   res.end("login");
        // } else {
        //   res.end("salah Password");
        // }
      } else {
        res.end("salah email");
      }
    });
  } else {
    res.send("Input woi");
  }
});

module.exports = router;
