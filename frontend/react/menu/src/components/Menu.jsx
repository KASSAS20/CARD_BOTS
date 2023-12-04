import { Link } from 'react-router-dom';
import '../App.css';

function Menu() {
    return (
        <div className="App">
            <div className='header'>Главное меню</div>
            <div className='container'>
                <div className='cards'><Link to='/cards'>Карточки</Link></div>
                <div className='shop'><Link to='/shop'>Магазин</Link></div>
                <div className='drop'><Link to='/drop'>Кейсы</Link></div>
                <div className='craft'><Link to='/craft'>Крафт</Link></div>
            </div>
            <div className='close'>Закрыть</div>
        </div>
    );
}

export default Menu;
