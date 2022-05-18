import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadReview } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import './ReviewForms.css'

const ReviewForm = ({ purchase, open }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [feedback, setFeedback] = useState(open)
    const showFeedback = (e) => {
        e.preventDefault()
        setFeedback(!feedback)
    }
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(rating)

        const review = {
            listing_id: purchase.id,
            reviewed_id: purchase.user_id,
            rating,
            body
        }

        const response = await dispatch(uploadReview(review))
        if (response.errors) {
            console.log(response.errors)
        }
        setFeedback(false)
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
            <button onClick={showFeedback} className='rb'>Leave Feedback</button>
            <Popup open={feedback}>
                <img src={purchase.photos} className='display-img'></img>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={(e) => setBody(e.target.value)}
                    >
                    </input>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        readonly={rating > 0}
                    />
                    <button type='submit'>submit</button>
                </form>
            </Popup>
        </>
    )

}

export default ReviewForm
