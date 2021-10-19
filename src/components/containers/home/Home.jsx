import React from "react";
import ContainerNotes from "./ContainerNotes";
import "../../../scss/pages/_Home.scss";
import NavBar from "../NavBar";
import Footer from "../Footer";
import {NoteForm} from "./NoteForm";
import {Header} from './header';

const Home = () => {

    const [state, setState] = React.useState({});
    const toggleModal = () => {
        setState({showModal: !state.showModal});
    }

    return (
        <div>
            <NavBar/>
            <div className="home__page">
                <Header toggleModal={toggleModal}/>
                <ContainerNotes/>
            </div>
            <Footer/>
            {state.showModal && (
                <NoteForm
                    mode="crate"
                    hideModal={toggleModal}
                />
            )}
        </div>
    );
};
export default Home;
