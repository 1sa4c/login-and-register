import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

function Dashboard(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('dashboard', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                const user = response.data
    
                setName(user.name)
                setEmail(user.email)
            } catch {
                history.push('/')
            }

        }

        fetchData()
    }, [history])

    function handleLogout(e){
        localStorage.removeItem('token')
        history.push('/')
    }

    return(
        <div className='page-container'>
            <div className="content-title">
                <h1>Dashboard</h1>
            </div>
            <div className="content-container">
                <h2 className='info-item'>{name} - {email}</h2>
                <p>This is a protected route. Only logged users can see this information.</p>
                <button onClick={e => handleLogout()} className='green-button'>Log out</button>
            </div>
        </div>
    )
}

export default Dashboard