import React, {useContext} from "react";
import ContainerNotes from "./ContainerNotes";
import "../../../scss/pages/_Home.scss";
import NavBar from "../NavBar";
import Footer from "../Footer";
import {NoteForm} from "./NoteForm";
import {Header} from './header';

export const HomeContext = React.createContext();
export const useHomeContext = () => useContext(HomeContext);
const Home = () => {

    const [state, setState] = React.useState({});
    const toggleModal = () => setState({showModal: !state.showModal});
    const closeModal = () =>  setState({...state, showModal: false, noteToUpdate: undefined});
    const setNote = (note) => setState({
        ...state,
        noteToUpdate: note,
        showModal: true
    });
    const modalProps = {mode: 'create'};
    if (state.noteToUpdate && state.showModal) {
        modalProps.mode = 'update';
        modalProps.note = state.noteToUpdate
    }
    return (
        <>
            <HomeContext.Provider value={{
                setNote: setNote
            }}>
                <div>
                    <NavBar/>
                    <div className="home__page">
                        <Header toggleModal={toggleModal}/>
                        <ContainerNotes/>
                    </div>
                    <Footer/>
                </div>
            </HomeContext.Provider>
            {state.showModal && (
                <NoteForm
                    {...modalProps}
                    hideModal={closeModal}
                />
            )}
        </>
    );
};
export default Home;
