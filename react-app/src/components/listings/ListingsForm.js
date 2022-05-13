import React from "react";
import { uploadListings } from "../../store/listings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'


const LisitngForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const [productTag, setProductTag] = useState()
    const [photoLoading, setPhotoLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("product_tag", productTag);
        formData.append("description", description);
        formData.append("price", price);
        formData.append('name', name);

        const response = await dispatch(uploadListings(formData))
        if (response.errors) {
            console.log(response.errors)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Product Tag</label>
            <select onChange={(e) => setProductTag(e.target.value)}>
                <option value='none' selected disabled hidden>Select an option</option>
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
            onChange={(e) => setName(e.target.value)}
            >
            </input>
            <label>Description</label>
            <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            >
            </input>
            <label>Price</label>
            <input
            type="text"
            onChange={e => setPrice(e.target.value)}>
            </input>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default LisitngForm
