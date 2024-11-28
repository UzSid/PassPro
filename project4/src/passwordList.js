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
            <h1 class="title">My accounts</h1>
            {arr.map((account) => (
                <div>
                    <Collapsible trigger={<div><h2>{"⮟    "+ account.Website}</h2><hr/></div>} class="Collapsible">
                        <p class="accountinfo"><b>Username:</b> {account.Username}</p>
                        <p class="accountinfo"><b>Password:</b> {account.Password}</p>
                        <Collapsible trigger={<b>{"⮟     Edit username"}</b>} class="Collapsible">
                            <form action="http://localhost/projects/project4/project4/src/editUsername.php" method="GET">
                                <hr/>
                                <label for="newUsername"><b>New username:</b></label><br/>
                                <input type="text" name="newUsername" required class="mainpageinputs"/><br/><br/>
                                <input type="hidden" name="ID" value={account.ID}/>
                                <input type="submit" class="submitedit"/>
                            </form>
                        </Collapsible>
                        <Collapsible trigger={<b>{"⮟     Edit password"}</b>} class="Collapsible">
                            <form action="http://localhost/projects/project4/project4/src/editPassword.php" method="GET">
                                <hr/>
                                <label for="newPassword"><b>New password:</b></label><br/>
                                <input type="text" name="newPassword" value={inputValue} onChange={handleInputChange} required class="editpageinputs"/><br/><br/>
                                <div class="editpagetips">
                                    Your password should have:
                                    {inputValue.length < 8 ? (<li class="bad">At least 8 characters</li>) : (<li class="good">At least 8 characters</li>)}
                                    {checkInt(inputValue) === false ? (<li class="bad">Numbers</li>) : (<li class="good">Numbers</li>)}
                                    {checkLower(inputValue) === false ? (<li class="bad">Lowercase letters</li>) : (<li class="good">Lowercase letters</li>)}
                                    {checkUpper(inputValue) === false ? (<li class="bad">Uppercase letters</li>) : (<li class="good">Uppercase letters</li>)}
                                    {checkSpecial(inputValue) === false ? (<li class="bad">Special characters</li>) : (<li class="good">Special characters</li>)}
                                </div>
                                <br/>                              
                                <form class="editpagegenerator">
                                    <h4><b>Password generator</b></h4>
                                    <label for="length">Length</label><br/>
                                    <input type="range" min="8" max="28" id="length" value={value} onChange={(e) => setValue(e.target.value)}/> {value} <br/>
                                    <input type="checkbox" id={"includeNumbers"+account.ID} name="includeNumbers" value={account.ID}/>
                                    <label for="includeNumbers">Include numbers</label><br/>
                                    <input type="checkbox" id={"includeLower"+account.ID} name="includeLower" value={account.ID}/>
                                    <label for="includeLower">Include lowercase letters</label><br/>
                                    <input type="checkbox" id={"includeUpper"+account.ID} name="includeUpper" value={account.ID}/>
                                    <label for="includeUpper">Include uppercase letters</label><br/>
                                    <input type="checkbox" id={"includeSpecial"+account.ID} name="includeSpecial" value={account.ID}/>
                                    <label for="includeSpecial">Include special characters</label><br/><br/>
                                    <button type="button" onClick={() =>handleClick(account.ID)} class="generatepasswordbutton">Generate Password</button>
                                </form>
                                <input type="hidden" name="ID" value={account.ID}></input> <br/>
                                <input type="submit" class="submitedit"/>
                            </form>
                        </Collapsible>
                        <button type="button" onClick={() => 
                            window.location.href = "http://localhost/projects/project4/project4/src/deletePassword.php?ID=" + account.ID}
                            class="deletebutton"
                        >Delete</button>
                    </Collapsible>
                </div>
            ))}
        </div>
    )
}

export default PasswordList;