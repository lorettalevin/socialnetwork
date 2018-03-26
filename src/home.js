import React from 'react'
import Logo from './logo'
import {Link} from 'react-router-dom';

export default function Home(){
    return (
        <div>
            <Logo />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <Link className="link" to="/bothauth">Click here to register if you haven't yet! Otherwise, log in!</Link>
        </div>
    )
}
