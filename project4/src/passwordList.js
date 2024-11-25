import Collapsible from 'react-collapsible';
import React, { useState } from 'react';
import {checkSpecial, checkLower, checkUpper, checkInt} from "./App";

function PasswordList() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };  

    const handleClick = () => {
        fetch('https://api.genratr.com/?length=8&uppercase&lowercase&special&numbers')
        .then(response => response.json())
        .then(json => {
          let content = json.password;
          setInputValue(content);
        });    
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
                                <input type="text" name="newUsername"/><br/>
                                <input type="hidden" name="ID" value={account.ID}/>
                                <input type="submit"/>
                            </form>
                        </Collapsible>
                        <p>Password: {account.Password}</p>
                        <Collapsible trigger="Edit password">
                            <form action="http://localhost/projects/project4/project4/src/editPassword.php" method="GET">
                                <label for="newPassword">New password:</label><br/>
                                <input type="text" name="newPassword" value={inputValue} onChange={handleInputChange}/><br/><br/>
                                <button type="button" onClick={handleClick}>Generate Password</button>
                                {inputValue.length < 8 ? (<p>Password must have at least 8 characters ❌</p>) : (<p>Password has at least 8 characters ✔</p>)}
                                {checkInt(inputValue) === false ? (<p>Password needs numbers ❌</p>) : <p>Password has numbers ✔</p>}
                                {checkLower(inputValue) === false ? (<p>Password needs lowercase letters ❌</p>) : (<p>Password has lowercase letters ✔</p>)}
                                {checkUpper(inputValue) === false ? (<p>Password needs uppercase letters ❌</p>) : (<p>Password has uppercase letters ✔</p>)}
                                {checkSpecial(inputValue) === false ? (<p>Password needs special characters ❌</p>) : (<p>Password has special characters ✔</p>)}
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