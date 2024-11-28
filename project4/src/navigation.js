import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <p class="navigation"><Link to="/App" class="link">New Password</Link><Link to="/PasswordList" class="link">My Passwords</Link></p>
    </nav>
  );
}

export default Navigation;