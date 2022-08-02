import {React} from 'react';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './index.css'

const SecondaryNav = () => {

    let outerwear = (
        <Popup
        trigger={<h5>OUTERWEAR</h5>}
        position='bottom center'
        on='hover'
        closeOnDocumentClick
        mouseLeaveDelay={100}
        mouseEnterDelay={0}
        arrow={false}
        className='second'
        >
            <NavLink to='/categories/jackets'><h5>JACKETS</h5></NavLink>
            <NavLink to='/categories/sweatshirts'><h5>SWEATSHIRTS</h5></NavLink>
            <NavLink to='/categories/hoodies'><h5>HOODIES</h5></NavLink>
        </Popup>
    )

    let tops = (
        <Popup
        trigger={<h5>TOPS</h5>}
        position='bottom center'
        on='hover'
        closeOnDocumentClick
        mouseLeaveDelay={100}
        mouseEnterDelay={0}
        arrow={false}
        className='second'
        >
            <NavLink to='/categories/shirts'><h5>SHIRTS</h5></NavLink>
            <NavLink to='/categories/tshirts'><h5>TSHIRTS</h5></NavLink>
        </Popup>
    )

    let bottoms = (
        <Popup
        trigger={<h5>BOTTOMS</h5>}
        position='bottom center'
        on='hover'
        closeOnDocumentClick
        mouseLeaveDelay={100}
        mouseEnterDelay={0}
        arrow={false}
        className='second'
        >
            <NavLink to='/categories/jeans'><h5>JEANS</h5></NavLink>
            <NavLink to='/categories/shorts'><h5>SHORTS</h5></NavLink>
            <NavLink to='/categories/pants'><h5>PANTS</h5></NavLink>
        </Popup>
    )

    let shoes = (
        <Popup
        trigger={<h5>SHOES</h5>}
        position='bottom center'
        on='hover'
        closeOnDocumentClick
        mouseLeaveDelay={100}
        mouseEnterDelay={0}
        arrow={false}
        className='second'
        >
            <NavLink to='/categories/shoes'><h5>SHOES</h5></NavLink>
        </Popup>
    )

    let accessories = (
        <Popup
        trigger={<h5>MISC</h5>}
        position='bottom center'
        on='hover'
        closeOnDocumentClick
        mouseLeaveDelay={100}
        mouseEnterDelay={0}
        arrow={false}
        className='second'
        >
            <NavLink to='/categories/hats'><h5>HATS</h5></NavLink>
            <NavLink to='/categories/accessories'><h5>ACCESSORIES</h5></NavLink>

        </Popup>
    )

    return (
        <nav>
            <div className="snc">
                {outerwear}
                {tops}
                {bottoms}
                {shoes}
                {accessories}
            </div>
        </nav>
    )
}

export default SecondaryNav
