import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [password, setPassword] = useState("");
  const [isCommonPasswordMessage, setIsCommonPasswordMessage] = useState("");
  const [isRepeatedPasswordMessage, setIsRepeatedPasswordMessage] =
    useState("");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const onSubmit = async () => {
    const isCommonPasswordService = await axios.post(
      "/common-password-service/",
      {
        password: password,
      }
    );
    const isRepeatedPasswordService = await axios.post(
      "/repeated-password-service/",
      {
        password: password,
      }
    );
    const passwordStrengthService = await axios.post(
      "/password-strength-service/",
      {
        password: password,
      }
    );
    setIsCommonPasswordMessage(isCommonPasswordService.data.res);
    setIsRepeatedPasswordMessage(isRepeatedPasswordService.data.res);
    setPasswordStrengthMessage(passwordStrengthService.data.res);
  };
  return (
    <div className="App">
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input type="submit" onClick={onSubmit} />
      <h2>{isCommonPasswordMessage}</h2>
      <h2>{isRepeatedPasswordMessage}</h2>
      <h2>{passwordStrengthMessage}</h2>
    </div>
  );
};

export default App;
