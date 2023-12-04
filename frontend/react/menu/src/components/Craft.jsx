import React from 'react';
import { Link } from 'react-router-dom';


const Craft = () => {
    return (
        <div className="App">
            <div className='header'>Крафты</div>

            <div className='close'><Link to='/'>Назад</Link></div>
        </div>
    );
}

export default Craft;
