import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { firebaseContext } from '../../Contexts/FirebaseContext'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
  const Navigate = useNavigate()

    const {firebase} = useContext(firebaseContext)

    const handleSubmit = (event)=>{
        event.preventDefault();
        let error = []
        
        if(email === ""){
            error = [...error, 'email']
        }
        if(password.length < 8){
            error = [...error, 'password']
        }
        setErrors(error)
        if(!error[0]){
          firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            Navigate('/')
          }).catch((error)=>{
            alert(error)
          })
        }
    }
    
  return (
    <div className='signContainer'>
        <h2>Image Host</h2>
      <form action="" className='signForm' onSubmit={handleSubmit}>
        
        <input className={`${errors.includes('email')?'formInvalid':''}`} onChange={(event)=>{
            setEmail(event.target.value)
        }} type="email" placeholder='Email' />
        <div className='passwordContainer'>
            <input  className={`${errors.includes('password')?'formInvalid':''}`} type="password" onChange={(event)=>{
                setPassword(event.target.value)
            }} placeholder='Password' />
            {errors.includes('password') && <p className='passwordError'>minimum 8 characters </p>}
        </div>
        <input type="submit" className='signBtn' value={'Login'} />
        <Link to={'/signup'}>
          <p>don't have an account ?</p>
        </Link>
      </form>

    </div>
  )
}

export default Login
