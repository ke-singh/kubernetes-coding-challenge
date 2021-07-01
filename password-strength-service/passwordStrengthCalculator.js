const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "01234567890";
const SYMBOLS = ")!@#$%^&*()";

const passwordStrengthCalculator = (password) => {
  if (!password) {
    return 0;
  }
  let score = 0,
    totalUC = 0,
    totalLC = 0,
    totalNums = 0,
    totalSymbols = 0,
    totalMiddleNumbersOrSymbols = 0,
    totalRepeatedChars = 0,
    totalUniqueChars = 0,
    totalConsecutiveUC = 0,
    totalConsecutiveLC = 0,
    totalConsecutiveNums = 0,
    repeatedCharDeduction = 0,
    totalSequentialAlphabets = 0,
    totalSequentialNums = 0,
    totalSequentialChars = 0;

  score += password.length * 4;
  let tempLC = "",
    tempUC = "",
    tempNum = "";
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[A-Z]/g)) {
      if (tempUC !== "") {
        if (tempUC + 1 === i) {
          totalConsecutiveUC++;
        }
      }
      tempUC = i;
      totalUC++;
    }
    if (password[i].match(/[a-z]/g)) {
      if (tempLC !== "") {
        if (tempLC + 1 === i) {
          totalConsecutiveLC++;
        }
      }
      tempLC = i;
      totalLC++;
    }
    if (password[i].match(/[0-9]/g)) {
      if (tempNum !== "") {
        if (tempNum + 1 === i) {
          totalConsecutiveNums++;
        }
      }
      if (i > 0 && i < password.length - 1) {
        totalMiddleNumbersOrSymbols++;
      }
      tempNum = i;
      totalNums++;
    }
    if (password[i].match(/[^a-zA-Z0-9_]/g)) {
      if (i > 0 && i < password.length - 1) {
        totalMiddleNumbersOrSymbols++;
      }
      totalSymbols++;
    }
    let repeatedCharExists = false;
    for (let k = 0; k < password.length; k++) {
      if (password[i] == password[k] && i != k) {
        repeatedCharExists = true;
        repeatedCharDeduction += Math.abs(password.length / (k - i));
      }
    }
    if (repeatedCharExists) {
      totalRepeatedChars++;
      totalUniqueChars = password.length - totalRepeatedChars;
      repeatedCharDeduction = totalUniqueChars
        ? Math.ceil(repeatedCharDeduction / totalUniqueChars)
        : Math.ceil(repeatedCharDeduction);
    }
  }
  for (let i = 0; i < 23; i++) {
    const forwardString = ALPHABETS.substring(i, parseInt(i + 3));
    const reverseString = forwardString.split("").reverse().join("");
    if (
      password.toLowerCase().indexOf(forwardString) != -1 ||
      password.toLowerCase().indexOf(reverseString) != -1
    ) {
      totalSequentialAlphabets++;
    }
  }
  for (let i = 0; i < 8; i++) {
    const forwardString = NUMS.substring(i, parseInt(i + 3));
    const reverseString = forwardString.split("").reverse().join("");
    if (
      password.toLowerCase().indexOf(forwardString) != -1 ||
      password.toLowerCase().indexOf(reverseString) != -1
    ) {
      totalSequentialNums++;
    }
  }
  for (let i = 0; i < 8; i++) {
    const forwardString = SYMBOLS.substring(i, parseInt(i + 3));
    const reverseString = forwardString.split("").reverse().join("");
    if (
      password.toLowerCase().indexOf(forwardString) != -1 ||
      password.toLowerCase().indexOf(reverseString) != -1
    ) {
      totalSequentialChars++;
    }
  }

  //minimum requirements - 2 points for each factor
  if (password.length > 8) {
    score += 2;
  }
  if (totalUC > 0) {
    score += 2;
  }
  if (totalLC > 0) {
    score += 2;
  }
  if (totalNums > 0) {
    score += 2;
  }
  if (totalSymbols > 0) {
    score += 2;
  }

  //additions

  if (totalUC > 0 && totalUC < password.length) {
    score += (password.length - totalUC) * 2;
  }
  if (totalLC > 0 && totalLC < password.length) {
    score += (password.length - totalLC) * 2;
  }
  if (totalNums > 0 && totalNums < password.length) {
    score += totalNums * 4;
  }
  if (totalSymbols > 0 && totalSymbols < password.length) {
    score += totalSymbols * 6;
  }
  if (
    totalMiddleNumbersOrSymbols > 0 &&
    totalMiddleNumbersOrSymbols < password.length
  ) {
    score += totalMiddleNumbersOrSymbols * 2;
  }

  //deductions

  if (totalNums === 0 && totalSymbols === 0 && (totalLC > 0 || totalUC > 0)) {
    score -= password.length;
  }
  if (totalLC === 0 && totalUC === 0 && totalSymbols === 0 && totalNums > 0) {
    score -= password.length;
  }
  if (repeatedCharDeduction > 0) {
    score -= repeatedCharDeduction;
  }
  if (totalConsecutiveUC > 0) {
    score -= totalConsecutiveUC * 2;
  }
  if (totalConsecutiveLC > 0) {
    score -= totalConsecutiveLC * 2;
  }
  if (totalConsecutiveNums > 0) {
    score -= totalConsecutiveNums * 2;
  }
  if (totalSequentialAlphabets > 0) {
    score -= totalSequentialAlphabets * 3;
  }
  if (totalSequentialChars > 0) {
    score -= totalSequentialChars * 3;
  }
  if (totalSequentialNums > 0) {
    score -= totalSequentialNums * 3;
  }
  return score;
};

module.exports = passwordStrengthCalculator;
