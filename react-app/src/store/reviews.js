export const GET_REVIEWS = 'reviews/GET_REVIEWS'
export const NEW_REVIEWS = 'reviews/NEW_REVIEWS'
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

const deleteReviews = (review) => ({
    type: DELETE_REVIEWS,
    review
})

export const grabReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getReviews(data))
    }
}

export const uploadReview = (review) => async (dispatch) => {
    const { listing_id, reviewed_id, rating, body } = review
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

    if (response.ok) {
        const data = await response.json()
        dispatch(postReview(data))
        return { message: 'success' }
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }
}

export const patchReview = (id, review) => async (dispatch) => {
    const { listing_id, rating, body } = review
    const response = await fetch(`/api/reviews/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listing_id,
            rating,
            body
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editReviews(data))
        return { message: 'success' }
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }
}

export const removeReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}/`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReviews(data))
    }
}

const initialState = {}

const reducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_REVIEWS:
            newState = {}
            action.reviews.reviews.forEach(review => {newState[review.listing_id] = review})
            return newState
        case NEW_REVIEWS:
            newState = { ...state }
            newState[action.review.listing_id] = action.review
            return newState
        case EDIT_REVIEWS:
            newState = {...state}
            newState[action.review.listing_id] = action.review
            return newState
        case DELETE_REVIEWS:
            newState = {...state}
            delete newState[action.review.listing_id]
            return newState
        default:
            return state
    }
}

export default reducer
