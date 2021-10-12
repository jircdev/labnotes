import React from "react";
import {useAuth} from "../../../context/AuthContext";
import "../../../scss/components/_cards.scss";
import "../../../scss/components/_CreateNotes.scss";
import {db} from "../../../lib/firebase";
import {doc, deleteDoc} from "firebase/firestore";

export const CreateNotes = ({note}) => {
    const {currentUser} = useAuth();
    const {id, title, description, date} = note;

    const deleteNote = async () => {
        try {
            await deleteDoc(doc(db, 'mynotes', id))
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <article className="card">
            <section className="card-body">
                <h3> {title} </h3>
                <p className="card__content"> {description} </p>
                <span className="card__date"> {date} </span>
            </section>
            <section className="card__actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={deleteNote}>Delete</button>
            </section>
        </article>
    );
};
