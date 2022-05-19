import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import './ReviewDisplay.css'

const ReviewDisplay = ({ review }) => {
   const listing = useSelector(state => state.listings[review.listing_id])
    return (
        <div className="review-container">
            <div className="review-info">
                <Rating
                    initialValue={review.rating}
                    readonly
                    />
                <p>{review.body}</p>
            </div>
            <img src={listing.photos} className='display-img' alt="This is the product"/>
        </div>
    )
}

export default ReviewDisplay
