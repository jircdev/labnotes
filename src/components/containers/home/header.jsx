import React from "react";
import {useAuth} from "../../../context/AuthContext";

export const Header = ({toggleModal}) => {

    const {currentUser} = useAuth();
    console.log(2, currentUser)
    return (
        <>
            <header>
                <h2>Hello {currentUser.email}</h2>
            </header>
            <button className="btnNotes" onClick={toggleModal}>
                Add a Note
            </button>
        </>
    )
}
