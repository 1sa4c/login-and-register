import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')

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
            setError(err.response.data.error)
        }
    }

    return(
        <div className='content-container'>
            <Link to='/' className='content-item'>
                <h1>Auth</h1>
                <h4>Simple as it should be.</h4>
            </Link>
            <h5>{error}</h5>
            <form className='sign-form' onSubmit={e => handleRegister(e)}>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Password confirmation" onChange={e => setPasswordConfirmation(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
            <div className='content-item'>
                <h4>Already have an account?</h4>
                <Link to='/login' className='link'>Login</Link>
            </div>
        </div>
    )
}

export default Register