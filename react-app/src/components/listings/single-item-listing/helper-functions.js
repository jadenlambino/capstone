import { React } from "react";
import { useSelector } from "react-redux";

const CategorySelector = (productTag) => {
    let listings = useSelector(state => Object.values(state.listings))
    let category = listings.filter(listing => listing.product_tag === productTag)
    return category
}

export default CategorySelector
