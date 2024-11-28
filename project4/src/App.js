import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState(8);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };  

  const handleClick = () => {
    let fetchURL = 'https://api.genratr.com/?length=' + document.getElementById("length").value;
    if (document.getElementById("includeNumbers").checked === true) {fetchURL += "&numbers";}
    if (document.getElementById("includeLower").checked === true) {fetchURL += "&lowercase";}
    if (document.getElementById("includeUpper").checked === true) {fetchURL += "&uppercase";}
    if (document.getElementById("includeSpecial").checked === true) {fetchURL += "&special";}
    if (document.getElementById("includeNumbers").checked === false &&
        document.getElementById("includeLower").checked === false &&
        document.getElementById("includeUpper").checked === false &&
        document.getElementById("includeSpecial").checked === false) {
          alert("Check at least one box");
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
      <h1>Add a new password</h1>
      <form action="http://localhost/projects/project4/project4/src/addpassword.php" method="GET">
        <div class="inputs">
          <label for="Website">Website: </label><br/>
          <input type="text" name="Website" required class="mainpageinputs"/><br/><br/>
          <label for="Username">Username: </label><br/>
          <input type="text" name="Username" required class="mainpageinputs"/><br/><br/>
          <label for="Password">Password: </label><br/>
          <input type="text" name="Password" value={inputValue} onChange={handleInputChange} required class="mainpageinputs"/><br/>
        </div>
        <br/>
        <div class="tips">
          Your password should have:
          {inputValue.length < 8 ? (<li class="bad">At least 8 characters</li>) : (<li class="good">At least 8 characters</li>)}
          {checkInt(inputValue) === false ? (<li class="bad">Numbers</li>) : (<li class="good">Numbers</li>)}
          {checkLower(inputValue) === false ? (<li class="bad">Lowercase letters</li>) : (<li class="good">Lowercase letters</li>)}
          {checkUpper(inputValue) === false ? (<li class="bad">Uppercase letters</li>) : (<li class="good">Uppercase letters</li>)}
          {checkSpecial(inputValue) === false ? (<li class="bad">Special characters</li>) : (<li class="good">Special characters</li>)}
        </div>
        <br/>
        <form class="generator">
          <h3><b>Password generator</b></h3>
          <label for="length">Length:  </label>
          <input type="range" min="8" max="28" id="length" value={value} onChange={(e) => setValue(e.target.value)}/> {value} <br/><br/>
          <input type="checkbox" id="includeNumbers" name="includeNumbers" value="&numbers"/>
          <label for="includeNumbers">Include numbers</label><br/><br/>
          <input type="checkbox" id="includeLower" name="includeLower" value="&lowercase"/>
          <label for="includeLower">Include lowercase letters</label><br/><br/>
          <input type="checkbox" id="includeUpper" name="includeUpper" value="&uppercase"/>
          <label for="includeUpper">Include uppercase letters</label><br/><br/>
          <input type="checkbox" id="includeSpecial" name="includeSpecial" value="&special"/>
          <label for="includeSpecial">Include special characters</label><br/><br/>
          <button type="button" onClick={handleClick} class="generatepasswordbutton">Generate Password</button>
        </form>
        <br/><br/>
        <input type="submit" class="submitbutton"/><br/>
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