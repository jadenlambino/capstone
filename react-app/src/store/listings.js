const GET_LISTINGS = 'listings/GET_LISTINGS'
const NEW_LISTINGS = 'listings/NEW_LISTINGS'

const getListings = (listings) => ({
    type: GET_LISTINGS,
    listings
})

const postListings = (listing) => ({
    type: NEW_LISTINGS,
    listing
})

export const grabListings = () => async (dispatch) => {
    const response = await fetch('api/listings/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getListings(data))
    }
}

export const uploadListings = (listingData) => async (dispatch) => {
    const {productTag, name, price, description, photos} = listingData;
    console.log(listingData)
    const response = await fetch('api/listings/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_tag: productTag,
            name,
            price,
            description,
            photos
        })
    })

    if (response.ok) {
        const listing = await response.json();
        dispatch(postListings(listing))
        return listing
    } else {
        const errors = await response.json();
        console.log(errors)
    }
}

export const patchListings = (id, listingData) => async (dispatch) => {
    const {productTag, name, price, description, photos} = listingData;
    const response = await fetch(`api/listings/${id}/`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_tag: productTag,
            name,
            price,
            description,
            photos
        })
    })

    if (response.ok) {
        const listing = await response.json();
        dispatch(editListings(listing))
        return listing
    }
    else {
        const errors = await response.json();
        console.log(errors)
    }
}

export const removeListings = (id) => async dispatch => {
    const response = await fetch(`api/listings/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteListings(id))
    }
}



const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_LISTINGS:
            newState = {}
            action.listings.listings.forEach(listing => {newState[listing.id] = listing})
            return newState
        case NEW_LISTINGS:
            newState = {...state};
            newState[action.listing.id] = action.listing
            return newState
        case EDIT_LISTINGS:
            newState = {...state};
            newState[action.listing.id] = action.listing
            return newState
        case DELETE_LISTINGS:
            newState = {...state};
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}
