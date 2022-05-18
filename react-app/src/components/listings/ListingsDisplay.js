import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grabListings } from '../../store/listings';
import SingleListing from './SIngleListing';
import { NavLink, useHistory } from 'react-router-dom';
import './ListingsDisplay.css'

const ListingsDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const listings = useSelector(state => Object.values(state.listings));
    const [render, setRender] = useState(false)

    useEffect(() => {
        dispatch(grabListings())
    }, [dispatch])

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
                                    <NavLink to={`/login`}>
                                        <img src={listing.photos} className='display-img'></img>
                                    </NavLink>
                                )}
                                <span className='listing-info'>
                                    <span>{listing.name}</span>
                                    <span>{listing.description}</span>
                                    <span>{listing.price}</span>
                                </span>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <h1>Hello</h1>
        </>
    )
}

export default ListingsDisplay
