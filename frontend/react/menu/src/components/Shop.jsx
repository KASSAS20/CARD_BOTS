import React from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    return (
        <div className="App">
            <div className='header'>Магазин</div>

            <div className='close'><Link to='/'>Назад</Link></div>
        </div>
    );
}

export default Shop;
