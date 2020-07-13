import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

function Reset(props){
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')
    const [tokenValidation, setTokenValidation] = useState()
    const [success, setSuccess] = useState('')

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('/session/reset', {
                    params: {
                        resetPasswordToken: props.match.params.token
                    }
                })

                setTokenValidation(true)
                setId(response.data.id)
            } catch(err) {
                setTokenValidation(false)
                setError(err.response.data || 'Something went wrong...')
            }
        }

        fetchData()
    }, [props.match.params.token])

    async function handleUpdate(e){
        e.preventDefault()
        if(!password || password !== passwordConfirmation) return setError('Passwords cannot be empty and must match')
        try{
            const response = await api.put('/session/update', {id, password})
            setSuccess(response.data)
            setError('')
            history.push('/login')
        } catch(err) {
            setSuccess(false)
            setError(err.response.data || 'Something went wrong...')
        }
    }

    return(
        <div className="page-container">
            <Link to='/' className='content-title'>
                <h1>Auth</h1>
            </Link>
            <div className="content-container">
                {tokenValidation 
                    ?
                    <>
                        <h1>Reset your password</h1>
                        <h4>{success}</h4>
                        <form className='sign-form' onSubmit={e => handleUpdate(e)}>
                            <span className='error-msg'>{error}</span>
                            <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)}/>
                            <input type="password" placeholder="Password confirmation" onChange={e => setPasswordConfirmation(e.target.value)}/>
                            <button className='green-button' type="submit">Reset</button>
                        </form>
                    </>
                    :
                        <h1>{error}</h1>
                }
            </div>
        </div>
    )
}

export default Reset