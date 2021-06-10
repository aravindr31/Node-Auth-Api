const bcrypt = require("bcrypt");
const { response } = require("express");
const db = require("./db");

module.exports = {
  signup: (data) => {
    return new Promise(async (resolve, reject) => {
      if (Object.keys(data).length == 0) return;
      else {
        db.get()
          .collection("userData")
          .insertOne({
            username: data.username,
            password: await bcrypt.hash(data.password, 10),
          })
          .then(() => {
            resolve({ addStatus: "success" });
          });
      }
    });
  },
  signin: (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection("userData")
        .findOne({ username: data.username });
      if (!user) {
        console.log("user not found");
      } else {
        console.log("user" + user);
        await bcrypt.compare(data.password, user.password).then((status) => {
          if (status) {
            console.log("authenticated");
            resolve({ status: status, user: user });
          } else {
            console.log("wrong password");
            resolve(status);
          }
        });
      }
    });
  },
};
