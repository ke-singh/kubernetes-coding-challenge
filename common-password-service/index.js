const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res, next) => {
  const { password } = req.body;
  try {
    const data = fs.readFileSync("commonPasswords.txt", "UTF-8");

    const lines = data.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === password) {
        return res.json({
          res: "Entered password found in the common passwords list!",
        });
      }
    }
    return res.json({
      res: "Entered password was not found in the common passwords list!",
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
  console.log(`Common passwords app listening on port ${port}!`);
});
