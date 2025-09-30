import React, { useState, useEffect } from 'react'

const Rating = ({mealType, currentRating, onRate}) => {  
    const emojis = ['🤢', '😭', '😐', '😋', '🤤'];
    const[selectedRating, setSelectedRating] = useState(currentRating || 0);

    useEffect(() => {
        setSelectedRating(currentRating || 0);
    }, [currentRating]);
    
    const handleClick = (index) => {
        const newRating = index + 1;
        if (selectedRating === newRating) {
            setSelectedRating(0);
            if (onRate) {
                onRate(mealType, 0);  // Send 0 to unrate
            }
        } else {
            setSelectedRating(newRating);
            if (onRate) {
                onRate(mealType, newRating);
            }
        }
    }
  return (
    <div className='mt-2 flex justify-center flex-col'>
        <div className='flex justify-around'>
            {emojis.map((emoji, index) => {
                return (
                    <button 
                        key = {index} 
                        onClick = {() => handleClick(index)}
                        className = {`text-3xl mt-4 transition-all hover:scale-105 ${
                            selectedRating === 0 
                                ? "opacity-100 scale-100"
                                :selectedRating === (index + 1) 
                                    ? "opacity-110 scale-110" 
                                    : "opacity-50 scale-90 "
                        }`}
                    >
                        {emoji}
                    </button>
                )
            })}
        </div>
        
    </div>
  )
}

export default Rating