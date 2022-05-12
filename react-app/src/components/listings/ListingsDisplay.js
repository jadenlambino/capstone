import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { grabListings } from '../../store/listings';
import LisitngForm from './ListingsForm';
import SingleListing from './SingleListing';

const ListingsDisplay = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const listings = useSelector(state => Object.values(state.listings));

    useEffect(() => {
        dispatch(grabListings())
    }, [dispatch])

    return (
        <>
            <div>
                {listings.map((listing, idx) => (
                    <SingleListing listing={listing} key={idx}/>
                ))}
            </div>
            <h1>Hello</h1>
            <LisitngForm />
        </>
    )
}

export default ListingsDisplay
