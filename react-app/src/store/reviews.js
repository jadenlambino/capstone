const GET_REVIEWS = 'reviews/GET_REVIEWS'
const NEW_REVIEWS = 'reviews/NEW_REVIEWS'
const EDIT_REVIEWS = 'reviews/EDIT_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const postReviews = (review) => ({
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
