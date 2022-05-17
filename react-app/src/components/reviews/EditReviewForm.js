import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchReview, removeReview } from "../../store/session";
import { Rating } from "react-simple-star-rating";
import { useHistory, useParams } from "react-router-dom";


const EditReview = ({ purchase }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState({})

    const grabSingle = (id) => async (dispatch) => {
        const response = await fetch(`/api/reviews/${id}/`)
        const review = await response.json()
        setReview(review)
    }

    useEffect(() => {
        dispatch(grabSingle(purchase.id))
    }, [dispatch])


    const [rating, setRating] = useState(review.rating)
    const [body, setBody] = useState(review.body)

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
        history.push('/listings')
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
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
        </>
    )
}

export default EditReview
