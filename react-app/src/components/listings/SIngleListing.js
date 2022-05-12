import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {patchListings, removeListings} from '../../store/listings'

const SingleListing = ({ listing}) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [photos, setPhotos] = useState('')
    const [productTag, setProductTag] = useState()

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
                    <option value='none' selected disabled hidden>Select an option</option>
                    <option value={1}>Jacket</option>
                    <option value={2}>Shirt</option>
                    <option value={3}>Sweatshirt</option>
                    <option value={4}>Hoodie</option>
                    <option value={5}>Jeans</option>
                    <option value={6}>Pants</option>
                    <option value={7}>Shorts</option>
                    <option value={8}>Shoes</option>
                    <option value={9}>Shoes</option>
                    <option value={10}>Hats</option>
                    <option value={11}>Accessories</option>
                </select>
                <label>Name</label>
                <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                >
                </input>
                <label>Description</label>
                <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                >
                </input>
                <label>Photo</label>
                <input
                type="text"
                onChange={(e) => setPhotos(e.target.value)}
                >
                </input>
                <label>Price</label>
                <input
                type="text"
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
