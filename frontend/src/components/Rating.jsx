import React, { useState } from 'react'

const Rating = () => {
    const [userRating, setUserRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const emojis = ['🤢', '😭', '😐', '😋', '🤤'];

    function handleRating(value) {
        if(userRating === 0) {
            setRatingCount(ratingCount + 1);
        }
        if(userRating === value) {     //same emoji clicked... unrated
            setRatingCount(ratingCount - 1);
            setUserRating(0);
            return;
        }
        setUserRating(value);   //storing which emoji clicked
    }

  return (
    <div className='mt-2 flex justify-center flex-col'>
        <div className='flex justify-around'>
            <button className="text-5xl hover:scale-120 transition" onClick={() => handleRating(1)}>🤢</button>
            <button className="text-5xl hover:scale-120 transition" onClick={() => handleRating(2)}>😭</button>
            <button className="text-5xl hover:scale-120 transition" onClick={() => handleRating(3)}>😐</button>
            <button className="text-5xl hover:scale-120 transition" onClick={() => handleRating(4)}>😋</button>
            <button className="text-5xl hover:scale-120 transition" onClick={() => handleRating(5)}>🤤</button>
        </div>
        {/* Total Rating = {ratingCount} */}
    </div>
  )
}

export default Rating