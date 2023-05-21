const express = require("express");
const router = express.Router();
const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// router.post("/signup", (req, res) => {
//   let { user_email_address, user_password } = req.body;
//   if (user_email_address && user_password) {
//     const salt = bcrypt.genSaltSync(8);
//     user_password = bcrypt.hashSync(user_password, salt);
//     let db = `
//     SELECT * FROM user_login
//     WHERE user_email = "${user_email_address}"
//     `;
//     connection.query(db, function (err, data) {
//       if (data.length > 0) {
//         return res.status(409).json({
//           message: "Email Already Exist",
//         });
//       } else {
//         let ins_db = `INSERT INTO user_login (user_email, user_password) VALUES ('${user_email_address}', '${user_password}');`;
//         connection.query(ins_db, function (err, data) {
//           return res.status(201).json({
//             user_email_address,
//             user_password,
//           });
//         });
//       }
//     });
//   } else {
//     return res.status(400).json({
//       message: "Please Input Email or Password",
//     });
//   }
// });

// router.post("/signin", (req, res) => {
//   let { user_email_address, user_password } = req.body;
//   if (user_email_address && user_password) {
//     db = `
//     SELECT * FROM user_login
//     WHERE user_email = "${user_email_address}"
//     `;
//     connection.query(db, function (err, data) {
//       if (data.length > 0) {
//         const passwordIsValid = bcrypt.compareSync(user_password, data[0].user_password);
//         if (passwordIsValid) {
//           const token = jwt.sign({ user_email_address }, "secret-key", { expiresIn: "1h" });
//           return res.status(201).json({
//             user_email_address,
//             user_password,
//             token,
//           });
//         } else {
//           return res.status(401).json({
//             message: "Wrong Password",
//           });
//         }
//       } else {
//         return res.status(401).json({
//           message: "Wrong Email",
//         });
//       }
//     });
//   } else {
//     return res.status(400).json({
//       message: "Please Input Email or Password",
//     });
//   }
// });

// router.get("/home", (req, res) => {
//   res.send("hai");
// });

// function verifyToken(req, res, next) {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(token, "secret-key", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: "Invalid token" });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// router.get("/protected", verifyToken, (req, res) => {
//   return res.status(401).json({ message: "Rute yang dilindungi. Selamat datang, " + req.user.user_email_address });
// });

router.post("/register", authController.signup);
router.post("/login", authController.signin);
router.get("/protected", authController.protected);

module.exports = router;
