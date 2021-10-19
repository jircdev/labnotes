import React, { useState } from "react";
import iconLogout from "../../assets/icons8-salida-64.png";
import { useAuth } from "../../context/AuthContext";
import {  useHistory } from "react-router-dom";
import { auth } from "../../lib/firebase";
import "../../scss/components/NavBar.scss";
import logo from "../../assets/nav.png";



const NavBar = () => {
    const { logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

const handleLogout = async () => {
  try {
    await logout(auth);
    console.log('saliendo de app')
    history.push("/");
  } catch (error) {
    setError("Server Error");
    console.log('saliendo de app')
  }
};

  return (
    <div>
      <div className="navBar">
        <img src={logo} alt="logonav" className="logoNav"/>
      </div>
      <div className="logout">
        <div className="textlogout">
          <img src={iconLogout} alt="iconlogout" className="icon" onClick={handleLogout} />
          <section onClick={handleLogout}>
            Sign Off
          </section>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
