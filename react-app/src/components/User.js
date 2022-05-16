import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [ratingValue, setRatingValue] = useState(0)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
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
      <div>
        {user.listings?.map((listing, idx) =>(
          <div key={idx}>
            <img src={listing.photos} alt='this is a picture' className='display-img'></img>
            <p>{listing.name}</p>
          </div>
        ))}
      </div>
      <div>
        {user.reviews?.map((review, idx) => (
          <div>
              <p>{review.body}</p>
              <Rating
              initialValue={review.rating}
              readonly
              />
          </div>
        ))}
      </div>
    </>
  );
}
export default User;
