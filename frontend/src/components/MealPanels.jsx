import React from 'react'
import Rating from './Rating'

const MealPanels = ({mealType, items = [], onRate, currentRating}) => {
  return (
    <div className = 'bg-[#004643] text-[#e8e4e6] text-center rounded-lg h-50 flex flex-col justify-center '>
        <h1 className='text-5xl'>{mealType}</h1>
        <p className='text-2xl text-[#abd1c6] mt-3'> {items.join(', ')}</p>
        <Rating 
          onRate = {onRate}
          currentRating = {currentRating}
          mealType = {mealType}
        />
    </div>
  )
}

export default MealPanels