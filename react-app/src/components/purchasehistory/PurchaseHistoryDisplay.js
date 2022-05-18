import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import ReviewForm from "../reviews/ReviewForm";

const PurchaseHistory = ({ purchase }) => {
    const [feedback, setFeedback] = useState(false)
    const showFeedback = (e) => {
        e.preventDefault()
        setFeedback(!feedback)
    }

    return (
        <div>
            <img src={purchase.photos} className='display-img'></img>
            <p>{purchase.name}</p>
            {!purchase.is_reviewed &&
                <>
                    <button onClick={showFeedback}>Leave Feedback</button>
                    <Popup open={feedback}>
                        <ReviewForm purchase={purchase} />
                    </Popup>
                </>
            }
        </div>
    )
}

export default PurchaseHistory
