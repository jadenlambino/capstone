import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams, Link } from 'react-router-dom';
import { grabSingle, patchListings, removeListings, purchaseListings } from '../../store/listings'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import './SingleListing.css'

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
    const [errors, setErrors] = useState([])
    const [openPurchase, setopenPurchase] = useState(false)
    const [openReminder, setOpenReminder] = useState(false)

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(grabSingle(id));
    }, [id, dispatch]);

    if (!listing) return null

    const handleEdit = async (e) => {
        e.preventDefault()
        const data = {
            productTag,
            name,
            price,
            description
        }
        const response = await dispatch(patchListings(listing.id, data))
        if (response.id) {
            setErrors([])
            setReveal(false)
            return
        } else {
            setErrors(response)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeListings(listing.id))
        history.push('/listings')
    }

    const rev = (e) => {
        e.preventDefault()
        setName(listing.name)
        setProductTag(listing.product_tag)
        setDescription(listing.description)
        setPrice(listing.price)
        setReveal(!reveal)
    }

    const reset = () => {
        setReveal(false)
        setErrors([])
    }

    let functionButtons = (
        <Popup open={reveal} onClose={reset} modal>
            <ul>
                {errors?.map((error, idx) => (
                        <li key={idx}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleEdit} className='sf'>
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
                    className='btb'
                >
                </input>
                <label>Price</label>
                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}>
                </input>
                <button type='submit' className='sfb'>Submit</button>
                <button onClick={handleDelete} className='sfb'>Delete</button>
            </form>
        </Popup>
    )

    let revealButton = (
        <button onClick={rev} className='rb'>Edit</button>
    )

    const handlePurchase = async (e) => {
        e.preventDefault()

        const data = {
            buyer_id: user.id
        }
        await dispatch(purchaseListings(id, data))
        setopenPurchase(false)
        setOpenReminder(true)
    }

    let reviewReminder = (
        <Popup open={openReminder} modal>
            <h1>Remember to leave a review!</h1>
            <Link to={`/users/${user.id}`} className='rb'>Take me to my profile</Link>
        </Popup>
    )

    let purchasePage = (
        <Popup open={openPurchase} modal>
            <h1>Proceed with purchase?</h1>
            <button onClick={handlePurchase} className='rb'>Yes</button>
            <button className='rb' onClick={() => setopenPurchase(!openPurchase)}> No</button>
        </Popup>
    )

    let buyButton = (
        <button onClick={() => setopenPurchase(!openPurchase)} className='rb'>Buy</button>
    )

    return (
        <div className='content-wrap'>
            <div className='s-l-c'>
                <div className='ic'>
                    <img src={listing.photos} alt="This is the product" className='s-p'></img>
                </div>
                <div className='s-i'>
                    <h1>
                        <NavLink to={`/users/${listing.user_id}/`} className='user-link'>{listing.username}</NavLink>
                    </h1>
                    <h1>{listing.name.toUpperCase()}</h1>
                    {user.id === listing.user_id && revealButton}
                    {reveal}
                    {functionButtons}
                    <p>Description<p>{listing.description}</p></p>
                    <p>Price<p>{`$${listing.price}`}</p></p>
                    {user.id !== listing.user_id && buyButton}
                    {purchasePage}
                    {reviewReminder}
                </div>
            </div>
        </div>
    )
}

export default SingleListing
