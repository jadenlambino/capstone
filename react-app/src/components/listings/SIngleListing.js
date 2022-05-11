import React from 'react';
import { useDispatch } from 'react-redux';

const SingleListing = ({ listing}) => {
    const dispatch = useDispatch();



    let functionButtons = (
        <>
            <form>

            </form>
        </>
    )

    return (
        <div>
            <h1>{listing.name}</h1>
        </div>
    )
}
