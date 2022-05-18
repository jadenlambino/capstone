import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";



const EditReview = ({ purchase }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const review = useSelector(state => state.reviews[purchase.id])

    const [rating, setRating] = useState(review.rating)
    const [body, setBody] = useState(review.body)

    const [feedback, setFeedback] = useState(false)
    const showFeedback = (e) => {
        e.preventDefault()
        setFeedback(!feedback)
    }

    const handleEdit = async (e) => {
        e.preventDefault()

        const edit = {
            listing_id: purchase.id,
            rating,
            body
        }

        const response = await dispatch(patchReview(review.id, edit))

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await dispatch(removeReview(review.id))
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
            <button onClick={showFeedback}>Leave Feedback</button>
            <Popup open={feedback}>
            <form onSubmit={handleEdit}>
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                >
                </input>
                <Rating
                    onClick={handleRating}
                    // ratingValue={rating}
                    // readonly={rating > 0}
                    initialValue={rating}
                />
                <button type='submit'>submit</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
            </Popup>
        </>
    )
}

export default EditReview
