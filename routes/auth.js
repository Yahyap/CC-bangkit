const express = require("express");
const router = express.Router();
const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        res.status(409).send;
        res.end("email sudah ada");
      } else {
        let ins_db = `INSERT INTO user_login (user_email, user_password) VALUES ('${user_email_address}', '${user_password}');`;
        connection.query(ins_db, function (err, data) {
          res.status(201).send;
          res.end("yey berhasil");
        });
      }
    });
  } else {
    res.status(400).send;
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
          const token = jwt.sign({ user_email_address }, "secret-key", { expiresIn: "1h" });
          res.json({ token });
        } else {
          res.status(401).send;
          res.end("salah password");
        }
      } else {
        res.status(401).send;
        res.end("salah email");
      }
    });
  } else {
    res.status(400).send;
    res.send("Input woi");
  }
});

router.get("/home", (req, res) => {
  res.send("hai");
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Rute yang dilindungi. Selamat datang, " + req.user_email_address });
});

module.exports = router;
