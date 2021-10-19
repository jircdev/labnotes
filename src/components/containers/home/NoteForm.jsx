import React, {useState} from 'react';
import {CustomModal} from './modal/CustomModal';
import {db} from "../../../lib/firebase";
import {collection, addDoc, doc, updateDoc} from "firebase/firestore";
import '../../../scss/components/_modal.scss'
import {useAuth} from '../../../context/AuthContext';
//import { updateDoc, serverTimestamp } from "firebase/firestore";

export const NoteForm = ({
                          note = {title: "", description: ""},
                          mode, hideModal
                      }) => {

        const {currentUser} = useAuth();
        const {id, title, description} = note;
        const [newTitle, setNewTitle] = useState(title);
        const [newDescription, setNewDescription] = useState(description);

        let user = currentUser.email;



        const handleSubmit = (e) => {
            e.preventDefault();
            if (mode === "edit") {
                updateNote();
            }
            else {
                createNote();
            }
            hideModal();
        };

        const handleTitleChange = (e) => setNewTitle(e.target.value);
        const handleDescription = (e) => setNewDescription(e.target.value);

        const createNote = async () => {
            try {
                await addDoc(collection(db, "mynotes"), {
                    title: newTitle,
                    description: newDescription,
                    date: new Date().toDateString(),
                    user: user,

                })
            }
            catch (error) {
                console.error(error);
            }
        };

        const updateNote = async () => {
            try {
                await updateDoc(doc(db, "mynotes", id), {
                    title: newTitle,
                    description: newDescription,
                    date: new Date().toDateString(),
                });
            }
            catch (error) {
                console.error(error);
            }
        };

        const buttonLabel = mode === "edit" ? "Update" : "Create";
        return (
            <CustomModal show onClose={hideModal}>
                <form className="note__form modal" onSubmit={handleSubmit}>
                    <div className="content__form">
                        <input
                            type="text" value={newTitle}
                            placeholder="Title"
                            onChange={handleTitleChange}
                            required/>
                        <textarea
                            value={newDescription}
                            placeholder="Description"
                            onChange={handleDescription}
                            required/>
                    </div>
                    <footer className="note__form__actions">
                        <button type="submit" className="primary-button">
                            {buttonLabel}
                        </button>
                    </footer>

                </form>
            </CustomModal>
        );
    }
;
