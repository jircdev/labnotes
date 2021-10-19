import React, {useState, useEffect} from "react";
import "../../../scss/components/_ContainerNotes.scss";
import "../../../scss/pages/_app.scss";
import {Note} from "./Note";
import {db} from "../../../lib/firebase";
import {useAuth} from "../../../context/AuthContext";
import {collection, orderBy, onSnapshot} from "firebase/firestore";
import '../../../scss/components/_notes.scss'

const ContainerNotes = () => {
    const {currentUser} = useAuth();
    const [mynotes, setMyNotes] = useState([]);

    useEffect(() => {
        const renderNotes = () => {
            try {
                onSnapshot(collection(db, "mynotes"), orderBy('date', 'asc'), (querySnapshot) => {
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        documents.push({id: doc.id, ...doc.data()});
                    });
                    setMyNotes(documents);
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        return renderNotes();

    }, []);

    return (

        <div className='container__notes'>
            <ul className='my-notes'>

                {mynotes.map((note) => (
                    currentUser.email === note.user ?
                        <Note key={note.id} note={note}/> : console.log('notes you dont have ')
                ))}

                {/* Export  component Modal  */}

            </ul>
        </div>
    );
};
export default ContainerNotes;
