import React, {useState} from "react";
import "../../scss/pages/_app.scss";
import "../../scss/pages/_Login.scss";
import logo from "../../assets/logocolor.png";
import iconGoogle from "../../assets/iconGoogle.png";
import {Link, useHistory} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";
import {auth} from "../../lib/firebase";

const Login = () => {
    const {login, loginGoogle} = useAuth();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        console.log('como sale user', user);
        if (user) {
            history.push('/Home');
        }
        else {
            try {
                const log = await login(email, password);
                console.log('que soy', log);
                console.log('history login', history);
                history.push("/Home");
            }
            catch (error) {
                setError("Wrong Credentials");
                setTimeout(() => setError(""), 1500);
            }
        }
    };
    const handleGoogle = async (e) => {
        e.preventDefault();
        try {

            await loginGoogle();
            console.log('ready google')
            console.log('history login', history);
            history.push('/Home');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='content'>
            <div className="containerLogin">
                <div className="logo">
                    <img src={logo} alt="logoMyNote"/>
                </div>
                <div className="login-content">
                    <form onSubmit={handleSubmit} className="form">
                        <input type="email" placeholder="Email" onChange={handleEmail}/>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePassword}
                        />
                        {error && <div className="error">{error}</div>}
                        <button
                            className="primary-button"
                            type="submit">Login
                        </button>

                    </form>
                    <div className="login-google">
                        <img src={iconGoogle} alt="logo google" className="icon"/>
                        <Link to="/Home" type="submit" onClick={handleGoogle}>
                            Login with Google
                        </Link>
                    </div>
                    <div className="link-signUp">
                        <p>
                            You do not have an account?<Link to="/SignUp"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>
                    Copyright - All rights reserved - Created by Ana Karina Dávila Dávila
                </p>
            </div>
        </div>
    );
};
export default Login;
