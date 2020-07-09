import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

function Navbar(){
    return(
        <header className='home-header'>
            <Link to='/' ><h3 id='logo'>AppLogo</h3></Link>
            <div className="home-header-links">
                <Link to='/register' className='header-link'>Register</Link>
                <Link to='/login' className='header-link'>Login</Link>
            </div>
        </header>
    )
}

export default Navbar