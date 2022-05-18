import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { grabReviews, patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import ReviewForm from "../reviews/ReviewForm";
import EditReview from "../reviews/EditReviewForm";
import { grabSingle } from "../../store/listings";

const PurchaseHistory = ({ purchase }) => {
    const dispatch = useDispatch()
    // const listing = useSelector(state => state.listings[purchase.id])
    const review = useSelector(state => state.reviews[purchase.id])

    // useEffect(() => {
    //     dispatch(grabReviews())
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(grabSingle(purchase.id))
    // }, [dispatch])

    // if (!listing) return null
    return (
        <div>
            <img src={purchase.photos} className='display-img'></img>
            <p>{purchase.name}</p>
            {/* {!review && <ReviewForm purchase={purchase} />}
            {review && <EditReview purchase={purchase} />} */}
            {review ? <EditReview purchase={purchase} open={false}/> : <ReviewForm purchase={purchase} open={false}/>}
        </div>
    )
}

export default PurchaseHistory
