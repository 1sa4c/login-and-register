import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <header className='home-header'>
            <div className="home-header-links">
                <Link to='/register' className='header-link'>Register</Link>
                <Link to='/login' className='header-link'>Login</Link>
            </div>
        </header>
    )
}

export default Navbar