import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';
import EditReview from './reviews/EditReviewForm';
import Popup from 'reactjs-popup'
import ReviewForm from './reviews/ReviewForm';


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
    console.log('reviews')
    user.reviews.forEach(review => {
      console.log(review)
      count += review.rating
      return count
    })
    count /= user.reviews.length
  }
  console.log(count)

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
          <div key={idx}>
            <p>{review.body}</p>
            <Rating
              initialValue={review.rating}
              readonly
            />
          </div>
        ))}
      </div>
      <div>
        {viewer.id === user.id && user.purchases?.map((purchase, idx) => (
          <div key={idx}>
            <img src={purchase.photos} className='display-img'></img>
            <p>{purchase.name}</p>
            <button onClick={showFeedback}>Leave Feedback</button>
            <Popup open={feedback}>
              <ReviewForm purchase={purchase}/>
            </Popup>
          </div>
        ))}
      </div>
    </>
  );
}
export default User;
