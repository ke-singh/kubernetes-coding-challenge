const express = require("express");
const cors = require("cors");
const passwordStrengthCalculator = require("./passwordStrengthCalculator");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  try {
    const { password } = req.body;
    const passwordScore = passwordStrengthCalculator(password);
    res.json({
      res: `Your password score strength is ${passwordScore}`,
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
  console.log(`Password strength app listening on port ${port}!`);
});
