import React from "react";
import { useSelector } from "react-redux";
import ReviewForm from "../reviews/ReviewForm";
import EditReview from "../reviews/EditReviewForm";
import './PurchaseHistory.css'

const PurchaseHistory = ({ purchase }) => {
    // const listing = useSelector(state => state.listings[purchase.id])
    const review = useSelector(state => state.reviews[purchase.id])

    // useEffect(() => {
    //     dispatch(grabReviews())
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(grabSingle(purchase.id))
    // }, [dispatch])

    // if (!listing) return null
    return (
        <div className="ulc">
                <img src={purchase.photos} className='display-img' alt="This is the product"></img>
                <div className='uli'>
                    <div>
                        <h4>Name</h4>
                        <span>{purchase.name}</span>
                    </div>
                    <div>
                        <h4>Description</h4>
                        <span>{purchase.description}</span>
                    </div>
                    <div>
                        <h4>Price</h4>
                        <span>{`$${purchase.price}`}</span>
                    </div>
                </div>
                {/* {!review && <ReviewForm purchase={purchase} />}
                {review && <EditReview purchase={purchase} />} */}
                {review ? <EditReview purchase={purchase} open={false}/> : <ReviewForm purchase={purchase} open={false}/>}
        </div>
    )
}

export default PurchaseHistory
