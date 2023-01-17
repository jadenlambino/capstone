import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grabListings } from '../../store/listings';
import { NavLink } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import 'reactjs-popup/dist/index.css';
import './ListingsDisplay.css'

const ListingsDisplay = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const listings = useSelector(state => Object.values(state.listings));
    const [login, setLogin] = useState(false)

    useEffect(() => {
        dispatch(grabListings())
    }, [dispatch])


    const showLogin = (e) => {
        e.preventDefault();
        setLogin(!login)
    }

    return (
        <div className="content-wrap">
            <div className="listings-header">
                <h2 className='l-head'>All Listings</h2>
            </div>
            <div className='listing-display'>
                {listings.map((listing, idx) => (
                    <div key={idx}>
                        {listing.is_purchased === false &&
                            <div key={idx} className='listing-container'>
                                {user ? (
                                    <NavLink to={`/listings/${listing.id}`}>
                                        <img src={listing.photos} className='display-img' alt="This is the product"></img>
                                    </NavLink>
                                ) : (
                                    <>
                                        <button onClick={showLogin}>
                                            <img src={listing.photos} className='display-img' alt="This is the product"></img>
                                        </button>
                                        <LoginForm please={login} work={setLogin}/>
                                    </>
                                )}
                                <span className='listing-info'>
                                    <span className='l-price'>{`$${listing.price}`}</span>
                                    <span className='l-title'>{listing.name}</span>
                                    {/* <span>{listing.description}</span> */}
                                </span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListingsDisplay
