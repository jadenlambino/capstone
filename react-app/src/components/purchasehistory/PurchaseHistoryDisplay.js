import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import ReviewForm from "../reviews/ReviewForm";
import EditReview from "../reviews/EditReviewForm";

const PurchaseHistory = ({ purchase }) => {

    return (
        <div>
            <img src={purchase.photos} className='display-img'></img>
            <p>{purchase.name}</p>
            {!purchase.is_reviewed && <ReviewForm purchase={purchase} />}
            {purchase.is_reviewed && <EditReview purchase={purchase} />}
        </div>
    )
}

export default PurchaseHistory
