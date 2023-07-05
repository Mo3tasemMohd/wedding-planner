import React from 'react';
import "../css/providerServices.css"
import ReactStars from 'react-rating-stars-component';

export function RateStars({ rating }) {
    return (
            <ReactStars
                count={5}
                value={Number(rating)}
                size={22}
                activeColor="#ffd700"
                edit={false}
                isHalf={true}
                className="star-rating"
            />

    );
}
