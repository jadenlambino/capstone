import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { uploadReview } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";

const ReviewForm = ({ listing}) => {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(rating)

        const review = {
            reviewed_id: listing.user_id,
            rating,
            body
        }

        const response = await dispatch(uploadReview(review))
        // if (response.errors) {
        //     console.log(response.errors)
        // }
    }

    const handleRating = (rate) => {
        setRating(rate / 20)
    }

    return (
        <>
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
