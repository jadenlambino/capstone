import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { grabListings } from '../../store/listings';
import LisitngForm from './ListingsForm';

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
                {listings.map(listing => (
                    <p key={listing.id}>{listing.name}</p>
                ))}
            </div>
            <h1>Hello</h1>
            <LisitngForm />
        </>
    )
}

export default ListingsDisplay
