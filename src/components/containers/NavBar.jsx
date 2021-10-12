import React, { useState } from "react";
import iconLogout from "../../assets/icons8-salida-64.png";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../lib/firebase";
import "../../Styles/NavBar.css";
import logo from "../../assets/nav.png";



const NavBar = () => {
    const { logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

const handleLogout = async () => {
  try {
    await logout(auth);
    history.push("/");
  } catch (error) {
    setError("Server Error");
  }
};


  return (
    <div>
      <div className="navBar">
        <img src={logo} alt="logonav" className="logoNav"></img>
      </div>
      <div className="logout">
        <div className="textlogout">
          <img src={iconLogout} alt="iconlogout" className="icon" />
          <Link to="/" onClick={handleLogout}>
            {/* Sign Off */}
          </Link>
          {/* <img src={logoHome} alt="iconlogout" className="icon" />
          <Link to="/Home">Home</Link> */}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};
export default NavBar;