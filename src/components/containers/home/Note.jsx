import React from "react";
//import {useAuth} from "../../../context/AuthContext";
import "../../../scss/components/_cards.scss";
import "../../../scss/components/_CreateNotes.scss";
import {db} from "../../../lib/firebase";
import {doc, deleteDoc} from "firebase/firestore";

import Swal from "sweetalert2";
import {useHomeContext} from "./Home";
import withReactContent from "sweetalert2-react-content";

export const Note = ({note}) => {

    const {id, title, description, date} = note;
    console.log("note", note);

    const {setNote} = useHomeContext();

    const deleteNote = () => {
        try {
            const MySwal = withReactContent(Swal);

            MySwal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Deleted!", "Your note has been deleted.", "success");
                    deleteDoc(doc(db, "mynotes", id));
                }
            });
            //window.confirm('Are you sure you want to delete');
        }
        catch (error) {
            console.log(error);
        }
    };
    // const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    return (
        <li>
            <div className="my-card">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
            </div>
            <button className="card-button" onClick={() => {
                setNote(note)
            }}>
                Edit
            </button>
            <section className="card__actions">

                <button className="card-button" onClick={deleteNote}>
                    Delete
                </button>
            </section>

        </li>
    );
};
