import React, { useContext } from 'react'
import { firebaseContext } from '../../Contexts/FirebaseContext';
import './Footer.css'
function Footer() {
    const {firebase} = useContext(firebaseContext)
  return (
    <div className='footerParentDiv'>
      <button className='logoutBtn' onClick={() =>{
                    firebase.auth().signOut();
            }}>Logout</button>
    <span></span>
    </div>
  )
}

export default Footer
