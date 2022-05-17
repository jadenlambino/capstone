const GET_REVIEWS = 'reviews/GET_REVIEWS'
const NEW_REVIEWS = 'reviews/NEW_REVIEWS'
const EDIT_REVIEWS = 'reviews/EDIT_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const postReview = (review) => ({
    type: NEW_REVIEWS,
    review
})

const editReviews = (review) => ({
    type: EDIT_REVIEWS,
    review
})

const deleteReviews = (id) => ({
    type: DELETE_REVIEWS,
    id
})

export const uploadReview = (review) => async (dispatch) => {
    const {listing_id, reviewed_id, rating, body} = review
    const response = await fetch('/api/reviews/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listing_id,
            reviewed_id,
            rating,
            body
        })
    })

    if (response.ok){
        return {'message': 'this is too lit with it'}
    } else {
        const errors = await response.json()
        console.log(errors)
        return errors
    }
}

export const patchReview = (id, review) => async (dispatch) => {
    const {rating, body} = review
    const response = await fetch(`/api/reviews/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating,
            body
        })
    })

    if (response.ok) {
        return {'message': 'too lit too lit'}
    } else {
        const errors = await response.json()
        console.log(errors)
        return errors
    }
}

export const removeReview = (id) => async (dispatch) => {
    const response = await fetch(`api/reviews/${id}/`, {
        method: 'DELETE'
    });

    if (response.ok){
        dispatch(deleteReviews(id))
    }
}
