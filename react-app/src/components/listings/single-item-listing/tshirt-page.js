import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import CategorySelector from './helper-functions'
import Popup from 'reactjs-popup';
import LoginForm from '../../auth/LoginForm';
import 'reactjs-popup/dist/index.css';
import '../ListingsDisplay.css'

const TShirtDisplay = (catagory_id) => {

    let category = CategorySelector(catagory_id)
    const user = useSelector(state => state.session.user);
    const [login, setLogin] = useState(false)
    const {catagoryName} = useParams()

    const showLogin = (e) => {
        e.preventDefault();
        setLogin(!login)
    }

    return (
        <div className="content-wrap">
                <div className="listings-header">
                        <h1 className='l-head'>{catagoryName.toUpperCase()}</h1>
                    </div>
                <div className='listing-display'>
                {category.map((listing, idx) => (
                    <div key={idx}>
                        {listing.is_purchased === false &&
                            <div key={idx} className='listing-container'>
                                {user ? (
                                    <NavLink to={`/listings/${listing.id}`}>
                                        <img src={listing.photos} className='display-img' alt="This is the product"></img>
                                    </NavLink>
                                ) : (
                                    <>
                                        <img src={listing.photos} className='display-img' alt="This is the product" onClick={showLogin}></img>
                                        <Popup open={login} onClose={showLogin}>
                                            <LoginForm />
                                        </Popup>
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

export default TShirtDisplay
