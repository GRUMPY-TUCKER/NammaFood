import React,{useRef} from 'react';
import { categories } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({Category,setCategory}) => {
    const menuRef = useRef(null);
    const scrollLeft = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({left : -200, behavior: 'smooth'});
        }
    };
    const scrollRight = () => {
        if (menuRef.current) {
            menuRef.current.scrollBy({left : 200, behavior: 'smooth'});
        }
    };
  return (
    <div className="explore-menu position-relative">
        <h1 className="d-flex align-items-center justify-content-between">
            Explore Menu
            <div className="d-flex">
            <i className='bi bi-arrow-left-circle scroll-icon me-2' onClick={scrollLeft}></i>
            <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
        </h1>
        <p>
            Explore curated food and drinks from the best restaurants in your city
        </p>
        <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" ref={menuRef}>
            {
            categories.map((item, index) => {
                return (
                <div className="text-center explore-menu-item" key={index} onClick={() => setCategory(prev => prev === item.category ? 'All' : item.category)}>
                    <img src={item.icon} alt="" className={item.category === Category ? 'rounded-circle active' : 'rounded-circle'} height={128} width={128}/>
                    <p className='mt-2 fw-bold'>{item.category}</p>
                </div>
            )}
        )}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu;