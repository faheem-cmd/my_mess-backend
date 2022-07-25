// const User = require("../models/user.models");

// function getUserbyMail(email) {
//   User.findOne({ email: email }).then((user) => {
//     if (user) {
//       return res.status(404).json({ message: "User already registered" });
//     } else {
//       User.create(req.body)
//         .then((data) => {
//           res.status(201).json({ message: "Created", data });
//         })
//         .catch((e) => res.status(500).json({ error: e }));
//     }
//     return user;
//   });
// }

// module.exports = { getUserbyMail };
