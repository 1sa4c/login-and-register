import React, {useState, useEffect} from 'react'
import api from '../../services/api'

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
        <div>
            <h1>Dashboard</h1>
            <div className="info">
                <h2>{name}</h2>
                <h2>{email}</h2>
            </div>
        </div>
    )
}

export default Dashboard