import { React } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CategorySelector = () => {
    let {catagoryName} = useParams()
    let listings = useSelector(state => Object.values(state.listings))
    let category = listings.filter(listing => listing.product_type === catagoryName)
    return category
}

export default CategorySelector
