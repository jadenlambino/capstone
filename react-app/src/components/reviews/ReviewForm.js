import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadReview } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";
import Popup from "reactjs-popup";
import './ReviewForms.css'

const ReviewForm = ({ purchase, open }) => {
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState(open)
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])

    const showFeedback = (e) => {
        e.preventDefault()
        setFeedback(!feedback)
    }

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
        if (response.message === 'success') {
            setFeedback(false)
        } else {
            setErrors(response)
        }

    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
            <button onClick={showFeedback} className='rb'>Leave Review</button>
            <Popup open={feedback}>
                <img src={purchase.photos} className='display-img' alt="This is the product"></img>
                <ul>
                    {errors?.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className='review-form'>
                    <span className="rti">
                        <label>Review</label>
                        <input
                            type="text"
                            onChange={(e) => setBody(e.target.value)}
                            className='ti'
                        >
                        </input>
                    </span>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        readonly={rating > 0}
                    />
                    <button type='submit' className="rb">submit</button>
                </form>
            </Popup>
        </>
    )

}

export default ReviewForm
