import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/App">Add</Link></li>
        <li><Link to="/PasswordList">My Passwords</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;