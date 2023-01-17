import React from "react";
import { uploadListings } from "../../store/listings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import './ListingForm.css'

const LisitngForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('https://www.cyclonehealth.iastate.edu/wp-content/uploads/shw-tiles/default.jpg')
    const [productTag, setProductTag] = useState()
    // const [defaultValue, setDefultValue] = useState(false)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (url === 'https://www.cyclonehealth.iastate.edu/wp-content/uploads/shw-tiles/default.jpg'){
            return setErrors(['Please make sure to upload an image of your product'])
        }

        const formData = new FormData();
        formData.append("product_tag", productTag);
        formData.append("description", description);
        formData.append("price", price);
        formData.append('name', name);
        formData.append('photos', url)

        const response = await dispatch(uploadListings(formData))
        if (response.id) {
            history.push(`/listings/${response.id}`)
        } else {
            setErrors(response)
        }
    }

    const uploadImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const updateImage = async (e) => {
        e.preventDefault();
        const imageData = new FormData();
        imageData.append("image", image);

        const uploadedUrl = await fetch('/api/images/', {
            method: 'POST',
            body: imageData,
        });

        if (uploadedUrl.ok) {
            const res = await uploadedUrl.json()
            setUrl(res.url)
            setErrors([])
        } else {
            const errors = await uploadedUrl.json()
            setErrors([errors.errors])
        }
    }

    return (
        <div className="content-wrap">
            <div className="fc">
                <h1>Add a new listing</h1>
                <ul>
                    {errors?.map((error, idx) => (
                            <li key={idx}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className='ldf'>
                    <div className="ltb">
                        <div className="ltbd">
                            <label className="il">Name</label>
                            <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className='ti'
                            >
                            </input>
                        </div>
                        <div className="ltbd">
                            <label className="il">Description</label>
                            <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            className='ti'
                            >
                            </input>
                        </div>
                    </div>
                    <div className="lts">
                        <div className="ltbd">
                            <label className="il">Product Tag</label>
                            <select
                            onChange={(e) => setProductTag(e.target.value)}
                            defaultValue={false}
                            className='si'
                            >
                                <option value={false} disabled hidden>Select an option</option>
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
                        </div>
                        <div className="ltbd">
                            <label className="il">Price</label>
                            <input
                            type="number"
                            onChange={e => setPrice(e.target.value)}
                            className='ti'
                            >
                            </input>
                        </div>
                    </div>
                </form>
                <div className="img-form">
                    <form onSubmit={updateImage}>
                        <label for='file' className='fi'>Choose File</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        id='file'
                        hidden
                        />
                    <button type="submit" className="fi" onClick={updateImage}>Add image</button>
                    </form>
                    <img src={url} className='listing-image' alt="listing">
                    </img>
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className="bh">Submit Form</button>
                </div>
            </div>
        </div>
    )
}

export default LisitngForm
