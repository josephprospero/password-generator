// Assignment code here
var getLength = function() {
  var length = ""
  while(length === "" || length === null) {
    length = window.prompt("Please indicate how many characters you need for your password. Enter a number between 8 and 128.");
    length = parseInt(length);
    if(length < 8) {
      length = "";
    }
    else if(length <= 128) {
      break;
    }
    else {
      length = ""
    }
  }
  
  var lengthConfirm = window.confirm("Is " + length + " characters correct?");
  if(lengthConfirm) {
    return length;
  }
  else {
    length = getLength();
    return length;
  }
}

String.prototype.shuffle = function() {
  var a = this.split("")
      n = a.length;
  
  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("")
}

var getCharacterType = function (type) {
  typeConfirm = window.confirm("Do you need " + type + " in your password?");
   if (typeConfirm) {
     return true;
  }
    else {
    return false;
    }
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// Declare variables for password criteria
var Criteria = function() {
  var lengthNum = getLength();
  var lowerCase = getCharacterType("lowercase letters");
  var upperCase = getCharacterType("capitalized letters");
  var numericCase = getCharacterType("numeric values");
  var specialCase = getCharacterType("special characters");
  while(lowerCase === false && upperCase === false && numericCase === false && specialCase === false) {
    window.alert("Please make at least 1 selection.");
    lowerCase = getCharacterType("lowercase letters");
    upperCase = getCharacterType("capitalized letters");
    numericCase = getCharacterType("numeric values");
    specialCase = getCharacterType("special characters");
  }
  var check = window.confirm(
  "So you want your password to have: \n" +
    "\n Numbers: " + lengthNum +  
    "\n Lowercase Letters: "  + lowerCase +
    "\n Capital Letters: " + upperCase + 
    "\n Numbers: " + numericCase +
    "\n Special Characters: " + specialCase +  
    "\n\n Does this look correct? If not, please select 'Cancel'. "
  );
  if(check === false) {
    lengthNum = Criteria();
  }
  return password = generatePassword(lengthNum, lowerCase, upperCase, numericCase, specialCase)  
}

// Create a function for generatePassword()
var generatePassword = function(length, lower, upper, number, symbol) {
  var generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
  
  // Doesn't have a selected type
  if(typesCount === 0) {
    return '';
  }

  // Create a loop
  for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  var thefinalPassword = finalPassword.shuffle();
  return thefinalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);  
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*()[]{}=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)];  
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = Criteria();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);