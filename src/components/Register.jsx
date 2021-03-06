import './register.css'
import {Room, Cancel} from '@material-ui/icons'
import {useRef, useState} from 'react';
import axios from 'axios';

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()


    const handleSubmit = async(e) =>{
        e.preventDefault();

        const newUser = {
            username : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value
        };


        try{
          const res = await axios.post("https://davidmapbox.herokuapp.com/api/users/register", newUser);
          console.log(res);
          setError(false)
          setSuccess(true);
        }catch(err){
            setError(true)
        }
    }


    return (
        <div className="registerContainer">
            <div className ="logo">
                <Room/>
                Davidpin
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="registerBtn">Register</button>
                {success && 
                   ( <span className="sucess">Successfull, please log in</span>)
                }
                {error && 
                
                   ( <span className="failure">Something went wrong</span>)
                }
                
                
            </form>
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
        </div>
    )
}
