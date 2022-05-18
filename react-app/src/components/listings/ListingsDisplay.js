import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grabListings } from '../../store/listings';
import Popup from 'reactjs-popup';
import { NavLink, useHistory } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import 'reactjs-popup/dist/index.css';
import './ListingsDisplay.css'

const ListingsDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const listings = useSelector(state => Object.values(state.listings));
    const [render, setRender] = useState(false)
    const [login, setLogin] = useState(false)

    useEffect(() => {
        dispatch(grabListings())
    }, [dispatch])


    const showLogin = (e) => {
      e.preventDefault();
      setLogin(!login)
    }

    return (
        <>
            <div className='listing-display'>
                {listings.map((listing, idx) => (
                    <div key={idx}>
                        {listing.is_purchased === false &&
                            <div key={idx} className='listing-container'>
                                {user ? (
                                    <NavLink to={`/listings/${listing.id}`}>
                                        <img src={listing.photos} className='display-img'></img>
                                    </NavLink>
                                ) : (
                                    <>
                                        <img src={listing.photos} className='display-img' onClick={showLogin}></img>
                                        <Popup open={login} onClose={showLogin}>
                                            <LoginForm />
                                        </Popup>
                                    </>
                                )}
                                <span className='listing-info'>
                                    <span>{listing.name}</span>
                                    <span>{listing.description}</span>
                                    <span>{`$${listing.price}`}</span>
                                </span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListingsDisplay
