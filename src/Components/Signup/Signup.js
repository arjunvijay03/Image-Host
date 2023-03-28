import React, {useContext, useState} from 'react'
import { firebaseContext } from '../../Contexts/FirebaseContext'
import './Signup.css'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
    const {firebase} = useContext(firebaseContext)
    const navigate = useNavigate()
  



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])



    const handleSubmit = (event)=>{
        event.preventDefault();
        let error = []
        if(name === ""){
            error = [...error, 'name']
        }
        if(email === ""){
            error = [...error, 'email']
        }
        if(password.length < 8){
            error = [...error, 'password']
        }
        setErrors(error)
        if(!error[0]){
            firebase.auth()
            .createUserWithEmailAndPassword(email, password).then((result)=>{
                
                firebase
                .firestore()
                .collection("users")
                .doc(result.user.uid)
                .set({images:[]})
                navigate('/')
            }).catch((error)=> alert(error))
        }
    }

    
  return (
    <div className='signContainer'>
        <h2>Image Host</h2>
      <form action="" className='signForm' onSubmit={handleSubmit} >
        <input className={`${errors.includes('name')?'formInvalid':''}`} type="text" onChange={(event)=>{
            setName(event.target.value)
        }} placeholder='Name' />
        
        <input className={`${errors.includes('email')?'formInvalid':''}`} type="email" onChange={(event)=>{
            setEmail(event.target.value)
        }} placeholder='Email' />
        <div className='passwordContainer'>
        <input className={`${errors.includes('password')?'formInvalid':''}`} type="password" onChange={(event)=>{
            setPassword(event.target.value)
        }} placeholder='Password' />
        {errors.includes('password') && <p className='passwordError'>minimum 8 characters </p>}
        </div>

        <input type="submit" className='signBtn' value={'Signup'} />
        <Link to={'/login'} >
             <p>already have an account ?</p>
        </Link>
      </form>
      
    </div>
  )
}

export default Signup
