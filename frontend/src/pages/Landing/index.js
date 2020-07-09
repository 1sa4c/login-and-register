import React from 'react'
import Navbar from '../../components/Navbar'

import './styles.css'

function Landpage(){
    return(
        <div>
            <Navbar/>
            <div className='main-container'>
                <div className='content-item'>
                    <h1 className='text'>A simple App using the MERN stack!</h1>
                    <h3 className='text'>Authentication via passport and JWT</h3>
                </div>
                <div className='logos'>
                    <img src='/assets/mongo.png' alt='mongodb'/>
                    <img src='/assets/express.png' alt='express'/>
                    <img src='/assets/react.png' alt='reactjs'/>
                    <img src='/assets/node.png' alt='nodejs'/>
                </div>
                <h5 className='text'>Developed by Isaac Rabello</h5>
            </div>
        </div>
    )
}

export default Landpage