import React, {useState, useEffect} from 'react'
import api from '../../services/api'

import './styles.css'

function Dashboard(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('dashboard', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            const user = response.data

            setName(user.name)
            setEmail(user.email)

            console.log(user)
        }

        fetchData()
    }, [])

    return(
        <div className='dashboard'>
            <div className="dashboard-title">
                <h1>Dashboard</h1>
            </div>
            <div className="info">
                <h2 className='info-item'>{name}</h2>
                <h2 className='info-item'>{email}</h2>
            </div>
        </div>
    )
}

export default Dashboard