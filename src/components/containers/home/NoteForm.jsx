import React, {useState} from 'react';
import {CustomModal} from './modal/CustomModal';
import {db} from "../../../lib/firebase";
import {collection, addDoc, doc, updateDoc} from "firebase/firestore";
import '../../../scss/components/_modal.scss'
import {useAuth} from '../../../context/AuthContext';

export const NoteForm = ({note, mode, hideModal}) => {

        const {currentUser} = useAuth();
        const isUpdating = mode === "update";
        if (!isUpdating) note = {title: "", description: ""};
        const {id, title, description} = note;
        const [newTitle, setNewTitle] = useState(title);
        const [newDescription, setNewDescription] = useState(description);

        let user = currentUser.email;

        const handleSubmit = (e) => {
            e.preventDefault();
            isUpdating ? updateNote() : createNote();
            hideModal();
        };

        const handleTitleChange = (e) => setNewTitle(e.target.value);
        const handleDescription = (e) => setNewDescription(e.target.value);

        const createNote = async () => {
            try {
                console.log(12, "aca", {
                    title: newTitle,
                    description: newDescription,
                    date: new Date().toDateString(),
                    user: user,

                });
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

        const buttonLabel = isUpdating ? "Update" : "Create";

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
