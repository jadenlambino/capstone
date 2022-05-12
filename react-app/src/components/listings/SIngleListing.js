import React from 'react';
import { useDispatch } from 'react-redux';
import {patchListings, removeListings} from '../../store/listings'

const SingleListing = ({ listing}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [photos, setPhotos] = useState('')
    const [productTag, setProductTag] = useState()

    handleEdit = async (e) => {
        e.preventDefault()
        await dispatch(patchListings(
            productTag,
            name,
            price,
            description,
            photos
        ))
    }

    const handleDelete = (e) => {
        e.preventDefault()
        await dispatch(removeListings())
    }


    let functionButtons = (
        <>
            <form>
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
        </>
    )

    return (
        <div>
            <h1>{listing.name}</h1>
        </div>
    )
}
