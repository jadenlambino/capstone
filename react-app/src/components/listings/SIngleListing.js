import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { grabSingle, patchListings, removeListings, purchaseListings } from '../../store/listings'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import './SingleListing.css'
import ReviewForm from '../reviews/ReviewForm';

const SingleListing = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();
    const user = useSelector(state => state.session.user)
    const listing = useSelector(state => state.listings[id])
    const [name, setName] = useState('')
    const [productTag, setProductTag] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [reveal, setReveal] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(grabSingle(id));
    }, [id]);

    console.log(listing)
    if (!listing) return null

    const handleEdit = async (e) => {
        e.preventDefault()
        const data = {
            productTag,
            name,
            price,
            description
        }
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

    const rev = (e) => {
        e.preventDefault()
        setName(listing.name)
        setProductTag(listing.product_tag)
        setDescription(listing.description)
        setPrice(listing.price)
        setReveal(!reveal)
    }

    let revealButton = (
        <button onClick={rev}>open</button>
    )

    const handlePurchase = async (e) => {
        e.preventDefault()

        const data = {
            buyer_id: user.id
        }
        await dispatch(purchaseListings(id, data))
        setOpen(true)
    }

    let buyButton = (
        <button onClick={handlePurchase}>Buy</button>
    )


    return (
        <div className='s-l-c'>
            <img src={listing.photos} alt='this is a picture' className='s-p'></img>
            <div className='s-i'>
                {user.id === listing.user_id && revealButton}
                {reveal && functionButtons}
                {user.id !== listing.user_id && buyButton}
                <h1>{listing.name}</h1>
                <p>{listing.description}</p>
                <p>{listing.price}</p>
            </div>
            {/* <Popup
            open={open}
            modal>
                <ReviewForm listing={listing}/>
            </Popup> */}
        </div>
    )
}

export default SingleListing
