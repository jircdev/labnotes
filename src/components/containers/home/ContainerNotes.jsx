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

        try {
            onSnapshot(collection(db, "mynotes"), orderBy('date', 'asc'), (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({id: doc.id, ...doc.data()});
                });
                console.log(1, documents);
                setMyNotes(documents);
            })
        }
        catch (error) {
            console.log(error)
        }

    }, []);

    const output = []
    mynotes.forEach((note) => {
        if (currentUser.email !== note.user) return false;
        output.push(<Note key={note.id} note={note}/>);
    });


    return (
        <div className='container__notes'>
            <ul className='my-notes'>
                {output}
            </ul>
        </div>
    );
};
export default ContainerNotes;
