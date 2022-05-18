import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';
import EditReview from './reviews/EditReviewForm';
import Popup from 'reactjs-popup'
import ReviewForm from './reviews/ReviewForm';
import ReviewDisplay from './reviews/ReviewDisplay';
import PurchaseHistory from './purchasehistory/PurchaseHistoryDisplay';


function User() {
  const viewer = useSelector(state => state.session.user)
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [ratingValue, setRatingValue] = useState(0)
  const [feedback, setFeedback] = useState(false)

  const fetchUser = async () => {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    setUser(user);
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  let count = 0
  if(user.reviews) {
    user.reviews.forEach(review => {
      count += review.rating
      return count
    })
    count /= user.reviews.length
  }

  const showFeedback = (e) => {
    e.preventDefault()
    setFeedback(!feedback)
  }

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <Rating
      initialValue={count || 0}
      readonly
      />
      <div>
        {user.listings?.map((listing, idx) => (
          <div key={idx}>
            <img src={listing.photos} alt='this is a picture' className='display-img'></img>
            <p>{listing.name}</p>
          </div>
        ))}
      </div>
      <div>
        {user.reviews?.map((review, idx) => (
          <ReviewDisplay review={review}/>
        ))}
      </div>
      <div>
        {viewer.id === user.id && user.purchases?.map((purchase, idx) => (
          <PurchaseHistory purchase={purchase} />
        ))}
      </div>
    </>
  );
}
export default User;
