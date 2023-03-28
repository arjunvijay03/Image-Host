import { createContext, useState,useEffect, useContext } from "react";
import { authContext } from "./AuthContext";
import {firebaseContext} from './FirebaseContext'


export const imageContext = createContext(null)



export default function ImageContext ({children}){
    const {firebase} = useContext(firebaseContext)
    const {user} = useContext(authContext)
    const [images, setImages] = useState()
  let docRef =  firebase.firestore().collection('users')

    useEffect(()=>{
        docRef.doc(user?.uid).onSnapshot((doc) => {
            doc.exists && setImages(doc.data().images);
        })
      },[user])
    return( 
    <imageContext.Provider value={{images}}>
        {children}
    </imageContext.Provider>
    )
}