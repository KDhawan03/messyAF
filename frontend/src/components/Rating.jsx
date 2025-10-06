import { useState, useEffect } from 'react'
import api from '../utils/axiosConfig'

const Rating = ({mealType, currentRating, onRate, selectedDate}) => {  
    const emojis = ['🤢', '😭', '😐', '😋', '🤤'];
    const[selectedRating, setSelectedRating] = useState(currentRating || 0);
    const [percentages, setPercentages] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        setSelectedRating(currentRating || 0);
    }, [currentRating]);
    
    useEffect(() => {
        loadPercentages();
    }, [mealType, selectedDate]);

    const loadPercentages = async () => {
        try {
            // const today = new Date().toISOString().split('T')[0];
            const response = await api.get(`/percentages/${selectedDate}/${mealType}`);
            setPercentages(response.data);
        } catch (error) {
            console.error('Failed to load percentages:', error);
            setPercentages([0, 0, 0, 0, 0]);
        }
    };

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
        setTimeout(() => {
            loadPercentages()
        }, 500);
    }
  return (
    <div className='mt-2 flex justify-center flex-col'>
        <div className='flex justify-around'>
            {emojis.map((emoji, index) => {
                return (
                    <div key={index} className="flex flex-col items-center">
                        <button 
                            onClick={() => handleClick(index)}
                            className={`text-3xl transition-all hover:scale-105 ${
                                selectedRating === 0 
                                    ? "opacity-100 scale-100"
                                    : selectedRating === (index + 1) 
                                        ? "opacity-100 scale-110" 
                                        : "opacity-50 scale-90"
                            }`}
                        >
                            {emoji}
                        </button>
                        
                        {selectedRating > 0 && (
                            <span className="text-s text-[#f9bc60] mt-1">
                                {percentages[index]}%
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default Rating