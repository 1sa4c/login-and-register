import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

function Forgot(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState()

    async function handleEmail(e){
        e.preventDefault()
        try{
            await api.post('/session/forgot', {email})
            setSuccess(true)
            setError('')
        } catch(err) {
            setError(err.response.data || 'Something went wrong...')
        }
    }

    return (
        <div className="page-container">
            <Link to='/' className='content-title'>
                <h1>Auth</h1>
            </Link>
            <div className='content-container'>
                {success
                    ?
                    <>
                        <h1>Recovery email sent!</h1>
                        <p className='info'>Check your email and follow the instructions</p>
                    </>
                    :
                    <>
                        <h1>Password reset</h1>
                        <p className='info'>
                            Enter the email address that you used to register.
                            We'll send you an email with your username and a link to reset your password.
                        </p>
                    </>
                }
                <form className='sign-form' onSubmit={e => handleEmail(e)}>
                    <span className='error-msg'>{error}</span>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <button className='green-button' type="submit">Send email</button>
                </form>
            </div>
        </div>
    )
}

export default Forgot