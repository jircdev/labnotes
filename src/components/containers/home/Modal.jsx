import React, { useState } from "react";
import ReactModal from "react-modal";
import { db } from "../../../lib/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#E6E7E8",
    border: "none",
    boxShadow: "5px 5px 10 px black",
  },
};
export const Modal = ({ note, mode, isVisible, hideModal}) => {
  const { id, title, description } = note;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [isOpen, setIsOpen] = useState(isVisible);

  const closeModal = () => {
    setIsOpen(false);
    hideModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      updateNote();
    } else {
      createNote();
    }
    closeModal();
  };

  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleDescription = (e) => setNewDescription(e.target.value);

  const createNote = async () => {
    try {
      await addDoc(collection(db,"mynotes"),{
        title: newTitle,
        description: newDescription,
      })
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async () => {
    try {
      await setDoc(doc(db, "mynotes", id),{
        title: newTitle,
        description: newDescription,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <form className="modal" onSubmit={handleSubmit}>
        <button className="close-button" onClick={closeModal}></button>
        <input
          type="text"
          value={newTitle}
          placeholder="Title"
          onChange={handleTitleChange}
        ></input>
        <textarea
          type="text"
          value={newDescription}
          placeholder="Description"
          onChange={handleDescription}
        ></textarea>
        {mode === "edit" ? (
          <button type="submit" className="edit-button">
            {" "}
            Update Quote{" "}
          </button>
        ) : (
          <button type="submit" className="create-button">
            {" "}
            Create Quote
          </button>
        )}
      </form>
    </ReactModal>
  );
};
