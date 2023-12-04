import React from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
    return (
        <div className="App">
            <div className='header'>Карточки</div>
            
            <div className='close'><Link to='/'>Назад</Link></div>
        </div>
    );
}

export default Cards;
