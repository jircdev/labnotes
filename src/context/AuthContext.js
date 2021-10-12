import React, {createContext, useState, useEffect, useContext} from "react";

import { auth } from "../lib/firebase";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged,  GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import PreLoad from "../components/containers/PreLoad";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {

    const [currentUser, setCurrentUser] = useState({});

   const[ready, setReady]=useState({});
    const history = useHistory();

    useEffect(()=>{

        onAuthStateChanged(auth, (user) =>{
            if(!user && window.location.pathname !=='/'){
                history.push('/')
                console.log('NO hay session');
                setCurrentUser(user);
                console.log('history ', history)
                setReady(true);
                return
            }
            if(user && window.location.pathname === '/'){
                history.push('/Home')
                console.log('Si hay Session');
                setCurrentUser(user);
                setReady(true);
                return; }
        })
    })


    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => signOut(auth);

    const loginGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }


    const value = {register, ready, login, logout, loginGoogle, currentUser};


    if(!ready){
        return <PreLoad />
    }
    return(

        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}
