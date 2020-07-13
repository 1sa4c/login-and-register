import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState('')

    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()

        try {
            await api.post('session/register', {
                name,
                email,
                password,
                passwordConfirmation
            })

            history.push('/login')
        }catch(err) {
            setErrors(err.response.data.errors)
        }
    }

    return(
        <div className="page-container">
                <Link to='/' className='content-title'>
                    <h1>Auth</h1>
                </Link>
            <div className='content-container'>
                <form className='sign-form' onSubmit={e => handleRegister(e)}>
                    <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                    <span className='error-msg'>{errors.name}</span>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <span className='error-msg'>{errors.email}</span>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <span className='error-msg'>{errors.password}</span>
                    <input type="password" placeholder="Password confirmation" onChange={e => setPasswordConfirmation(e.target.value)}/>
                    <span className='error-msg'>{errors.passwordConfirmation}</span>
                    <button className='green-button' type="submit">Register</button>
                </form>
                <div className='content-item'>
                    <h4>Already have an account?</h4>
                    <Link to='/login' className='link'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register