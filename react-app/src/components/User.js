import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { Link, NavLink, useParams } from 'react-router-dom';
import ReviewDisplay from './reviews/ReviewDisplay';
import PurchaseHistory from './purchasehistory/PurchaseHistoryDisplay';
import './User.css'


function User() {
  const viewer = useSelector(state => state.session.user)
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [listings, setListings] = useState(true)
  const [reviews, setReviews] = useState(false)
  const [transactions, setTransactions] = useState(false)

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
  }, [userId, fetchUser]);

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

  const showListings = (e) => {
    e.preventDefault();
    setReviews(false)
    setTransactions(false)
    setListings(true)
  }

  const showReviews = (e) => {
    e.preventDefault();
    setListings(false);
    setTransactions(false);
    setReviews(true);
  }

  const showTransactions = (e) => {
    e.preventDefault();
    setListings(false);
    setReviews(false);
    setTransactions(true);
  }

  let listingButton = viewer.id === user.id ? (
  <button className='user-buttons' onClick={showListings}>My Listings</button>)
  : (<button className='user-buttons' onClick={showListings}>Listings</button>)

  let userReviews = (
    <div className='review-display'>
        <div className='user-score'>
          <h2 className='seller'>Seller Score</h2>
          <Rating
          initialValue={count || 0}
          readonly
          />
          <h4>{`${user.reviews?.length} Feedback`}</h4>
        </div>
      {user.reviews?.map((review, idx) => (
        <ReviewDisplay review={review} key={idx}/>
      ))}
    </div>
  )

  return (
    <>
      <div className='user-info'>
        <img src={user.profile_image} alt="This is the product"></img>
        <h1>{user.username}</h1>
        <Rating
        initialValue={count || 0}
        readonly
        />
      </div>
      <div className='user-buttons-container'>
        {listingButton}
        <button className='user-buttons' onClick={showReviews}>Reviews</button>
        {viewer.id === user.id && (
          <button onClick={showTransactions} className='user-buttons'>My Purchases</button>
        )}
      </div>
      <div className='display-container'>
        {listings && user.listings?.map((listing, idx) => (
          <div key={idx} className='ulc'>
            <NavLink to={`/listings/${listing.id}`}>
              <img src={listing.photos} alt="This is the product" className='display-img'></img>
            </NavLink>
            <div className='uli'>
              <div>
                <h4>Name</h4>
                <span>{listing.name}</span>
              </div>
              <div>
                <h4>Description</h4>
                <span>{listing.description}</span>
              </div>
              <div>
                <h4>Price</h4>
                <span>{`$${listing.price}`}</span>
              </div>
            </div>
            <div>
              <Link to={`/listings/${listing.id}`} className='ueb'>Edit Listing</Link>
            </div>
          </div>
        ))}

        {reviews && userReviews}

        {transactions && viewer.id === user.id && user.purchases?.map((purchase, idx) => (
          <PurchaseHistory purchase={purchase} />
        ))}
      </div>
    </>
  );
}
export default User;
