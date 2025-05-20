import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function UserLayout(){
    return(
        <div>
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    )
}
