// import React, { useState } from "react";
// import iconLogout from '../../assets/icons8-salida-64.png'
// import { useAuth } from "../../context/AuthContext";
// import { Link, useHistory } from 'react-router-dom';
// import { auth } from "../../lib/firebase";
// import '../../Styles/Home.css';
// import logo from '../../assets/nav.png';
// import logoHome from '../../assets/home.png'



// const FormNotes = (notes) => {
//   const [error, setError] = useState("");
//   const { currentUser, logout } = useAuth();
//   console.log('soy currentUser', currentUser)

//   const history = useHistory();
//  // const [title, setTitle] = useState("");
// //const [note, setNote] = useState("");
// //const handleTitle = (e) => setTitle(e.target.value);
// //const handleNote = (e) => setNote(e.target.value);

//   const handleLogout = async () => {
//     try {
//       await logout(auth);
//       history.push('/');
//     } catch (error) {
//       setError('Server Error');
//     }
//   };
//   const[description, title, date]= notes
//   return (
//     <div>
//     <div className="contentNotes">
//     <div className='navBar'>
//  <img src={logo} alt='logonav' className='logoNav'></img>
//     </div>
//     <div className='logout'>
//     <div className='textlogout'>
//     <img src={iconLogout} alt="iconlogout" className="icon" />
//     <Link to="/" onClick={handleLogout}>Sign Off</Link>
//     <img src={logoHome} alt="iconlogout" className="icon" />
//     <Link to="/Home">Home</Link>
// </div>
//     </div>
//       <div className="error">
//         {error && <p className="error-message">{error}</p>}
//       </div>
//       <div className='containerFormNotes'>
//       <h1>Hi</h1>
//       <p>{currentUser.email}</p>
//       {/* <form className="form">
//           <input type="text" placeholder="Title"  />
//           <textarea type="text" placeholder="Write your note here "  />
//           {error && <p className='error' >{error}</p>}
//           <button className='btnNotes'>Add Note</button>
//         </form> */}

//         <blockquote className="card">
//         <div>
//           <p>{title}</p>
//           <p>{description}</p>
//           <p>{date}</p>
//         </div>
//         <div className='card-actions'>
//         <button className='edit-button'>Edit</button>
//         <button className='delete-button'>Delete</button>

//         </div>

//         </blockquote>
//       </div>
//       </div>
//       <div className="footer">
//         <p>
//           Copyright - All rights reserved - Created by Ana Karina Dávila Dávila
//         </p>
//       </div>
    
//     </div>
//   );
// };
// export default FormNotes;