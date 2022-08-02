import { React } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CategorySelector from './helper-functions'

const TShirtDisplay = (catagory_id) => {

    let category = CategorySelector(catagory_id)

    return (
        <div className='listing-container'>
            {category.map((listing, idx) => (
                <div key={idx}>
                    <NavLink to={`/listings/${listing.id}`}>
                        <img src={listing.photos} className='display-img' alt="This is the product"></img>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default TShirtDisplay
