import React from 'react';
import logo from '../img/circle-41681.png'


const Header = () => {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" style={{height:'60px' , width:'60px' }} ></img>
                </div>
            </nav>
        </header>
    )
}

export default Header;
