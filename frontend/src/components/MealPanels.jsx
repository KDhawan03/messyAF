import React from 'react'
import Rating from './Rating'

const MealPanels = ({mealType, items = [], }) => {
  return (
    <div className = 'bg-[#004643] text-[#e8e4e6] flex flex-col justify-center text-center p-4 m-5 rounded-lg h-50 w-1/2'>
        <h1 className='text-5xl'>{mealType}</h1>
        <p className='text-2xl text-[#abd1c6] mt-3'> {items.join(', ')}</p>
        <Rating />
    </div>
  )
}

export default MealPanels