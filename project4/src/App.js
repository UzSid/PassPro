import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };  

  const handleClick = () => {
    let fetchURL = 'https://api.genratr.com/?length=8';
    if (document.getElementById("includeNumbers").checked == true) {fetchURL += "&numbers";}
    if (document.getElementById("includeLower").checked == true) {fetchURL += "&lowercase";}
    if (document.getElementById("includeUpper").checked == true) {fetchURL += "&uppercase";}
    if (document.getElementById("includeSpecial").checked == true) {fetchURL += "&special";}
    if (document.getElementById("includeNumbers").checked == false &&
        document.getElementById("includeLower").checked == false &&
        document.getElementById("includeUpper").checked == false &&
        document.getElementById("includeSpecial").checked == false) {
          alert("Choose");
    }
    else {
      fetch(fetchURL)
      .then(response => response.json())
      .then(json => {
        let content = json.password;
        setInputValue(content);
      });
    }
  };

  return (
    <div className="App">
      <form action="http://localhost/projects/project4/project4/src/addpassword.php" method="GET">
        <label for="Website">Website:</label><br/>
        <input type="text" name="Website"/><br/>
        <label for="Username">Username:</label><br/>
        <input type="text" name="Username"/><br/>
        <label for="Password">Password:</label><br/>
        <input type="text" name="Password" value={inputValue} onChange={handleInputChange}/><br/><br/>
        <form>



          <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
          <p>Value: <span id="demo"></span></p>




          <input type="checkbox" id="includeNumbers" name="includeNumbers" value="Bike"/>
          <label for="includeNumbers">Include numbers</label><br/>
          <input type="checkbox" id="includeLower" name="includeLower" value="Car"/>
          <label for="includeLower">Include lowercase letters</label><br/>
          <input type="checkbox" id="includeUpper" name="includeUpper" value="Boat"/>
          <label for="includeUpper">Include uppercase letters</label><br/>
          <input type="checkbox" id="includeSpecial" name="includeSpecial" value="Car"/>
          <label for="includeSpecial">Include special characters</label><br/><br/>
          <button type="button" onClick={handleClick}>Generate Password</button>
        </form>
        {inputValue.length < 8 ? (<p>Password must have at least 8 characters ❌</p>) : (<p>Password has at least 8 characters ✔</p>)}
        {checkInt(inputValue) === false ? (<p>Password needs numbers ❌</p>) : <p>Password has numbers ✔</p>}
        {checkLower(inputValue) === false ? (<p>Password needs lowercase letters ❌</p>) : (<p>Password has lowercase letters ✔</p>)}
        {checkUpper(inputValue) === false ? (<p>Password needs uppercase letters ❌</p>) : (<p>Password has uppercase letters ✔</p>)}
        {checkSpecial(inputValue) === false ? (<p>Password needs special characters ❌</p>) : (<p>Password has special characters ✔</p>)}
        <br/><br/><br/>
        <input type="submit"/>
      </form> 
    </div>
  );
}

export function checkSpecial(str) {
  let specialz = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  for (let i = 0; i < str.length; i++) {
    if (specialz.includes((str[i]))) {
      return true;
    }
  }
  return false;
}

export function checkLower(str) {
  if (str === str.toUpperCase()) {
      return false;
  }
}

export function checkUpper(str) {
  if (str === str.toLowerCase()) {
      return false;
  }
}

export function checkInt(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      return true;
    }
  }
  return false;
}

export default App;