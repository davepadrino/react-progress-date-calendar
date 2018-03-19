import React from 'react'

const weekCount = weekNumbers => {
  if (weekNumbers) {
    return <div className='r-cell r-weeknum'>wn</div>
  }
}

const WeekDays = props => {
  const haystack = Array.apply(null, { length: 7 }).map(Number.call, Number)

  return (
    <div className='r-row r-weekdays'>
      {weekCount(props.weekNumbers)}
      {haystack.map((item, i) => {
        return <div key={i} className='r-cell'>{props.dayNames[(props.startDay + i) % 7]}</div>
      })}
    </div>
  )
}


export default WeekDays