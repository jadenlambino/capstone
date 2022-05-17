import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadReview } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";
import { useHistory } from "react-router-dom";

const ReviewForm = ({ purchase }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')

    const handleSubmit = async(e) => {
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

        history.push(`/users/${user.id}`)
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
            <img src={purchase.photos}></img>
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
        </>
    )

}

export default ReviewForm
