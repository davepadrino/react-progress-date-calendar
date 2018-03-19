import React from 'react'


const Header = props => {
  const currentDay = new Date()
  return (
    <div className='r-row r-head'>
      <button
        className='r-cell r-prev'
        onClick={props.onPrev}
        type="button"
        tabIndex='0'
        disabled={
          props.disablePast &&
          currentDay.getMonth() === props.month &&
          currentDay.getFullYear() === props.year
        } />

      <div className='r-cell r-title'>
        {`${props.monthNames[props.month]} ${' '} 
      ${props.year}`}
      </div>

      <button
        className='r-cell r-next'
        onClick={props.onNext}
        type="button"
        tabIndex='0'
        disabled={
          props.disableFuture &&
          currentDay.getMonth() === props.month &&
          currentDay.getFullYear() === props.year
        } />

    </div>
  )
}

export default Header
