import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { patchReview, removeReview } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import './ReviewForms.css'

const EditReview = ({ purchase, open }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const review = useSelector(state => state.reviews[purchase.id])
    const [errors, setErrors] = useState([])
    const [rating, setRating] = useState(review.rating)
    const [body, setBody] = useState(review.body)

    const [feedback, setFeedback] = useState(open)
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
        if (response.message === 'success') {
            setFeedback(false)
        } else {
            setErrors(response)
        }

    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await dispatch(removeReview(review.id))
        setFeedback(false)
        // history.push(`/users/${user.id}`)
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
            <button onClick={showFeedback} className='rb'>Edit Feedback</button>
            <Popup open={feedback}>
                <ul>
                    {errors?.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={handleEdit} className='review-form'>
                    <span className="rti">
                        <label>Review</label>
                        <input
                            type="text"
                            onChange={(e) => setBody(e.target.value)}
                            className='ti'
                            value={body}
                        >
                        </input>
                    </span>
                    <Rating
                        onClick={handleRating}
                        // ratingValue={rating}
                        // readonly={rating > 0}
                        initialValue={rating}
                    />
                    <div>
                        <button type='submit' className="rb">Submit</button>
                        <button onClick={handleDelete} className="rb">Delete</button>
                    </div>
                </form>
            </Popup>
        </>
    )
}

export default EditReview
