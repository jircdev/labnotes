import React, {useState, useEffect} from "react";
import "../../../scss/components/_ContainerNotes.scss";
import {CreateNotes} from "./CreateNotes";
import {db} from "../../../lib/firebase";
import {useAuth} from "../../../context/AuthContext";
import plus from '../../../assets/plusazul.png'
import {collection, query, onSnapshot} from "firebase/firestore";
import {Modal} from "./Modal";

const ContainerNotes = () => {
    const {currentUser} = useAuth();
    const [mynotes, setNotes] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => setIsVisible(!isVisible);
    const newNote = {title: "", description: ""};

    useEffect(() => {
        const q = query(collection(db, "mynotes"));
        onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({id: doc.id, ...doc.data()});
            });
            setNotes(documents);
        });
    }, [mynotes]);

    return (
        <div>
            <button className="btnNotes" onClick={toggleModal}>
                <img src={plus} className='icon' alt="plus"/>
                Add a Note
            </button>

            <div className="container__notes">
                <p>{currentUser.email}</p>
                {mynotes.map((note) => (
                    <>
                        <CreateNotes key={`${note.id}1`} note={note}/>
                        <CreateNotes key={`${note.id}2`} note={note}/>
                        <CreateNotes key={`${note.id}13`} note={note}/>
                    </>

                ))}

                {/* Export  component Modal  */}
                {isVisible && (
                    <Modal
                        mode="create"
                        isVisible={isVisible}
                        note={newNote}
                        hideModal={toggleModal}
                    />
                )}
            </div>
        </div>
    );
};
export default ContainerNotes;
