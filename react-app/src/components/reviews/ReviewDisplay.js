import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";

const ReviewDisplay = ({ review }) => {
    return (
        <div>
            <p>{review.body}</p>
            <Rating
                initialValue={review.rating}
                readonly
            />
        </div>
    )
}

export default ReviewDisplay
