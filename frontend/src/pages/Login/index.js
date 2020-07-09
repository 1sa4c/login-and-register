import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('session/login', {
                email,
                password
            })

            const {token} = response.data
            localStorage.setItem('token', token)
            history.push('/dashboard')
        }catch(err) {
            setError(err.response.data.error)
        }
    }

    return(
        <div className="page-container">
            <Link to='/' className='content-title'>
                <h1>Auth</h1>
            </Link>
            <div className='content-container'>
                <form className='sign-form' onSubmit={e => handleLogin(e)}>
                    <span className='error-msg'>{error}</span>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
                <div className='content-item'>
                    <h4>Not registered yet?</h4>
                    <Link to='register' className='link'>Register now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login