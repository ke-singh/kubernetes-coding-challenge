const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { genRandomString, sha512 } = require("./passwordEncryption");
const pass = require("./last10Passwords.json");
const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res, next) => {
  const { password } = req.body;
  try {
    let passwordFound = false;
    let data = JSON.parse(fs.readFileSync("last10Passwords.json", "UTF-8"));
    const passwordData = sha512(password, genRandomString(16));
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].passwordHash === sha512(password, data[i].salt).passwordHash
      ) {
        passwordFound = true;
        break;
      }
    }
    data.push({
      passwordHash: passwordData.passwordHash,
      salt: passwordData.salt,
    });
    if (data.length - 10 > 0) {
      data = data.slice(data.length - 10, data.length);
    }
    fs.writeFile("last10Passwords.json", JSON.stringify(data), (err) => {
      if (err) {
        next(err);
      }
    });
    return res.json({
      res: `Entered password was${
        !passwordFound ? " not" : ""
      } found in the last 10 calls!`,
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Repeated passwords app listening on port ${port}!`);
});
