import Collapsible from 'react-collapsible';
import React, { useState } from 'react';
import {checkSpecial, checkLower, checkUpper, checkInt} from "./App";

function PasswordList() {
    const [value, setValue] = useState(8);
    
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };  

    function handleClick(id) {
        let fetchURL = 'https://api.genratr.com/?length=' + document.getElementById("length").value;
        if (document.getElementById("includeNumbers"+id).checked === true) {fetchURL += "&numbers";}
        if (document.getElementById("includeLower"+id).checked === true) {fetchURL += "&lowercase";}
        if (document.getElementById("includeUpper"+id).checked === true) {fetchURL += "&uppercase";}
        if (document.getElementById("includeSpecial"+id).checked === true) {fetchURL += "&special";}
        if (document.getElementById("includeNumbers"+id).checked === false &&
            document.getElementById("includeLower"+id).checked === false &&
            document.getElementById("includeUpper"+id).checked === false &&
            document.getElementById("includeSpecial"+id).checked === false) {
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

    fetch("http://localhost/projects/project4/project4/src/passwordList.php")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            sessionStorage.setItem("passwords", JSON.stringify(json));				
        });
    let arr = JSON.parse(sessionStorage.getItem("passwords"));

    return(
        <div>
            {arr.map((account) => (
                <div>
                    <Collapsible trigger={account.Website}>
                        <p>Username: {account.Username}</p>
                        <Collapsible trigger="Edit username">
                            <form action="http://localhost/projects/project4/project4/src/editUsername.php" method="GET">
                                <label for="newUsername">New username:</label><br/>
                                <input type="text" name="newUsername" required/><br/>
                                <input type="hidden" name="ID" value={account.ID}/>
                                <input type="submit"/>
                            </form>
                        </Collapsible>
                        <p>Password: {account.Password}</p>
                        <Collapsible trigger="Edit password">
                            <form action="http://localhost/projects/project4/project4/src/editPassword.php" method="GET">
                                <label for="newPassword">New password:</label><br/>
                                <input type="text" name="newPassword" value={inputValue} onChange={handleInputChange} required/><br/><br/>
                                <form>
                                    <label for="length">Length</label><br/>
                                    <input type="range" min="8" max="20" id="length" value={value} onChange={(e) => setValue(e.target.value)}/> {value} <br/>
                                    <input type="checkbox" id={"includeNumbers"+account.ID} name="includeNumbers" value={account.ID}/>
                                    <label for="includeNumbers">Include numbers</label><br/>
                                    <input type="checkbox" id={"includeLower"+account.ID} name="includeLower" value={account.ID}/>
                                    <label for="includeLower">Include lowercase letters</label><br/>
                                    <input type="checkbox" id={"includeUpper"+account.ID} name="includeUpper" value={account.ID}/>
                                    <label for="includeUpper">Include uppercase letters</label><br/>
                                    <input type="checkbox" id={"includeSpecial"+account.ID} name="includeSpecial" value={account.ID}/>
                                    <label for="includeSpecial">Include special characters</label><br/><br/>
                                    <button type="button" onClick={() =>handleClick(account.ID)}>Generate Password</button>
                                </form>
                                {inputValue.length < 8 ? (<p>Password should have at least 8 characters ❌</p>) : (<p>Password has at least 8 characters ✔</p>)}
                                {checkInt(inputValue) === false ? (<p>Password should have numbers ❌</p>) : <p>Password has numbers ✔</p>}
                                {checkLower(inputValue) === false ? (<p>Password should have lowercase letters ❌</p>) : (<p>Password has lowercase letters ✔</p>)}
                                {checkUpper(inputValue) === false ? (<p>Password should have uppercase letters ❌</p>) : (<p>Password has uppercase letters ✔</p>)}
                                {checkSpecial(inputValue) === false ? (<p>Password should have special characters ❌</p>) : (<p>Password has special characters ✔</p>)}
                                <input type="hidden" name="ID" value={account.ID}></input>
                                <input type="submit"/>
                            </form>
                        </Collapsible>
                        <br/><br/>
                        <button type="button" onClick={() => 
                            window.location.href = "http://localhost/projects/project4/project4/src/deletePassword.php?ID=" + account.ID}
                        >Delete</button>
                    </Collapsible>
                </div>
            ))}
        </div>
    )
}

export default PasswordList;