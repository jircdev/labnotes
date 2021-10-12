import React from 'react'
import ContainerNotes from './ContainerNotes';
import NavBar from '../NavBar';
import Footer from '../Footer';

const Home = () => {
    return (
        <div className="home__page">
            <NavBar/>
            <ContainerNotes/>
            <Footer/>
        </div>
    )
}
export default Home;


