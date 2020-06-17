import React from 'react'
import Navbar from '../../components/Navbar'

function Landpage(){
    return(
        <div>
            <Navbar/>
            <div className='main-container'>
                <div className="content-item">
                    <h1>A simple App using the MERN stack!</h1>
                    <p>Authentication via passport and JWT</p>
                </div>
                <p>Developed by Isaac Rabello</p>
            </div>
        </div>
    )
}

export default Landpage