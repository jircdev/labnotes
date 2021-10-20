import React, {useState} from "react";
import "../../scss/pages/_app.scss";
import "../../scss/pages/_Login.scss";
import logo from "../../assets/logocolor.png";
import iconGoogle from "../../assets/iconGoogle.png";
import {Link, useHistory} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";
import {auth} from "../../lib/firebase";
import Footer from "./Footer";

const Login = () => {
    const {login, loginGoogle, currentUser} = useAuth();

    const [state, setState] = useState({});
    const history = useHistory();
    const handleEmail = e => setState({...state, email: e.target.value});
    const handlePassword = e => setState({...state, password: e.target.value});

    const {email, password, error} = state;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
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
                setState({...state, error: "Wrong Credentials"});
                setTimeout(() => setState({...state, error: undefined}), 1500);
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
            setState({...state, error: "Wrong Credentials"});
            console.log('user', currentUser.email);

        }
    }

    const attrs = {};

    if (!email || !password) attrs.disabled = true;
    return (
        <div className='content'>
            <div className="container__Login">
                <header className="logo">
                    <img src={logo} alt="logoMyNote"/>
                </header>

                <div className="login__form">
                    <form onSubmit={handleSubmit} className="form">
                        <input type="email" placeholder="Email" onChange={handleEmail}/>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePassword}
                        />
                        <div className="error__section">{error}</div>
                        <button
                            {...attrs}
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
                        <section className="link-signUp">
                            <p className="text-signUp">You do not have an account?</p><Link to="/SignUp"> Sign up</Link>
                        </section>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default Login;
