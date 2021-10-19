import React from "react";
import "../../../scss/components/_notes.scss";
import {db} from "../../../lib/firebase";
import {doc, deleteDoc} from "firebase/firestore";
import Swal from "sweetalert2";
import {useHomeContext} from "./Home";
import withReactContent from "sweetalert2-react-content";

export const Note = ({note}) => {

    const {id, title, description, date} = note;
    const {setNote, setOnView} = useHomeContext();

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
    const onEdit = () => setNote(note);
    const onView = () => setOnView(note);
    return (
        <li>
            <div className="card__content">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
            </div>

            <section className="card__actions">
                <div className="items">
                    <button className="card-button" onClick={onEdit}>
                        <i className="fas fa-edit"/>
                    </button>
                    <button className="card-button" onClick={deleteNote}>
                        <i className="fas fa-trash-alt"/>
                    </button>
                    <button className="card-button" onClick={onView}>
                        <i className="fas fa-trash-alt"/>
                    </button>
                </div>

            </section>

        </li>
    );
};
