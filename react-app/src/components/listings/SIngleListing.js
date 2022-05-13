import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {patchListings, removeListings} from '../../store/listings'
import './SingleListing.css'

const SingleListing = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const id = Number(Object.values(useParams()))

    const user = useSelector(state => state.session.user)
    const listings = useSelector(state => state.listings)
    const listing = listings[id]
    console.log(id)
    console.log(listings)
    console.log(listing)

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
        //hello
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        history.push('/listings')
        await dispatch(removeListings(listing.id))
    }

    let functionButtons = (
        <>
            <form onSubmit={handleEdit}>
                <label>Product Tag</label>
                <select
                onChange={(e) => setProductTag(e.target.value)}
                defaultValue={listing.product_tag}>
                    <option value={listing.product_tag} selected hidden>{listing.product_type}</option>
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
                type="file"
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
        <div className='s-l-c'>
            <img src={listing.photos} alt='this is a picture' className='s-p'></img>
            <div className='s-i'>
                {user.id === listing.user_id && functionButtons}
                <h1>{listing.name}</h1>
                <p>{listing.description}</p>
                <p>{listing.price}</p>
                <h1>Hello</h1>
            </div>
        </div>
    )
}

export default SingleListing
