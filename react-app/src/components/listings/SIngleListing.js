import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {patchListings, removeListings} from '../../store/listings'

const SingleListing = ({ listing}) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const [name, setName] = useState(listing.name)
    const [price, setPrice] = useState(listing.price)
    const [description, setDescription] = useState(listing.description)
    const [photos, setPhotos] = useState(listing.photos)
    const [productTag, setProductTag] = useState(listing.productTag)

    const handleEdit = async (e) => {
        e.preventDefault()
        const data = {
        productTag,
        name,
        price,
        description,
        photos}
        await dispatch(patchListings(listing.id, data))
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeListings(listing.id))
    }


    let functionButtons = (
        <>
            <form onSubmit={handleEdit}>
                <label>Product Tag</label>
                <select onChange={(e) => setProductTag(e.target.value)}>
                    <option value={listing.product_tag} selected disabled hidden>{listing.product_type}</option>
                    <option value={1}>Jacket</option>
                    <option value={2}>Shirt</option>
                    <option value={3}>T-Shirt</option>
                    <option value={4}>Sweatshirt</option>
                    <option value={5}>Hoodie</option>
                    <option value={6}>Jeans</option>
                    <option value={7}>Pants</option>
                    <option value={8}>Shorts</option>
                    <option value={9}>Shoes</option>
                    <option value={10}>Hats</option>
                    <option value={11}>Accessories</option>
                </select>
                <label>Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
                </input>
                <label>Description</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
                </input>
                <label>Photo</label>
                <input
                type="text"
                value={photos}
                onChange={(e) => setPhotos(e.target.value)}
                >
                </input>
                <label>Price</label>
                <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}>
                </input>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={handleDelete}>delete</button>
        </>
    )

    return (
        <div>
            <h1>{listing.name}</h1>
            {user.id === listing.user_id && functionButtons}
        </div>
    )
}

export default SingleListing
