import React from 'react';
import { Link } from 'react-router-dom';


const Drop = () => {
    return (
        <div className="App">
            <div className='header'>Кейсы</div>

            <div className='close'><Link to='/'>Назад</Link></div>
        </div>
    );
}

export default Drop;
