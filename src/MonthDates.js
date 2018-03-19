import React, { Component } from 'react'
import m from 'moment'
import _ from 'lodash'
import './circle.css'

class MonthDates extends Component {

  // percentaje calculation per day
  calcDayProgress = (current, exercises) => {    
    const dateMoment = m(current, 'MM-DD-YYY')
    let completedExercises = 0
    exercises.forEach(e => {
      _.find(Object.keys(e.completionDates), date => {
        console.log('exercises ', e.completionDates);
        if (m(date, 'MM-DD-YYYY').isSame(dateMoment)) {
          console.log('isSame ', date);
          completedExercises++
        }
      })
    })
    return Math.floor((completedExercises / exercises.length) * 100)
  }

  render() {
    const {
      firstOfMonth,
      year,
      daysInMonth,
      exercises,
      month,
      weekNumbers,
      disablePast,
      disableFuture,
      onSelect,
      minDate,
      maxDate
    } = this.props
    var haystack,
      day,
      d,
      current,
      isDate,
      className,
      weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
      startDay = firstOfMonth.getDay(),
      first = firstOfMonth.getDay(),
      janOne = new Date(year, 0, 1),
      rows = 5;
    if ((startDay === 5 && daysInMonth) === 31 ||
      (startDay === 6 && daysInMonth > 29)) {
      rows = 6;
    }

    className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
    haystack = Array.apply(null, { length: rows }).map(Number.call, Number);
    day = this.props.startDay + 1 - first;
    while (day > 1) {
      day -= 7;
    }
    day -= 1;
    return (
      <div className={className}>
        {
          haystack.map((item, i) => {
            d = day + i * 7;
            return (
              <div key={i} className='r-row'>
                {(() => {
                  if (weekNumbers) {
                    const wn = Math.ceil(((new Date(year, month, d) - janOne) / 86400000 + janOne.getDay() + 1) / 7);
                    return <div className='r-cell r-weeknum'>{wn}</div>
                  }
                })()}
                {
                  weekStack.map((item, i) => {
                    d += 1;
                    isDate = d > 0 && d <= daysInMonth;
                    if (isDate) {
                      current = new Date(year, month, d);
                      const today = m()
                      const percentage = this.calcDayProgress(current, exercises)
                      if (exercises.length > 0) {
                        className = m(current, 'MM-DD-YYY').isSame(m(today, 'MM-DD-YYYY'), 'day') ?
                          `r-cell r-date r-today p${percentage} pAll0` : `pAll0 r-cell r-date p${percentage}`
                      } else {
                        className = m(current, 'MM-DD-YYY').isSame(m(today, 'MM-DD-YYYY'), 'day') ?
                          'r-cell r-date r-today' : 'r-cell r-date'
                      }

                      if (disablePast && m(current, 'MM-DD-YYY').isBefore(m(today, 'MM-DD-YYYY'), 'day')) {
                        className += ' r-past';
                      } else if (minDate !== null && m(current, 'MM-DD-YYY').isBefore(m(minDate, 'MM-DD-YYYY'), 'day')) {
                        className += ' r-past';
                      }

                      if (disableFuture && m(current, 'MM-DD-YYY').isAfter(m(today, 'MM-DD-YYYY'), 'day')) {
                        className += ' r-future';
                      } else if (maxDate !== null && m(current, 'MM-DD-YYY').isAfter(m(maxDate, 'MM-DD-YYYY'), 'day')) {
                        className += ' r-future';
                      }

                      if (/r-past/.test(className) || /r-future/.test(className)) {
                        return (
                          <button key={i}
                            type="button"
                            tabIndex='0'
                            onClick={
                              onSelect.bind(this, year, month, d)
                            }
                            className={`${className} c100 smaller`}
                            disabled
                          >
                            <span>{d}</span>
                            <div className="slice">
                              <div className="bar"></div>
                              <div className="fill"></div>
                            </div>
                          </button>
                        )
                      }
                      return (
                        <button key={i}
                          type='button'
                          tabIndex='0'
                          onClick={
                            onSelect.bind(this, year, month, d)
                          }
                          className={`${className} c100 smaller`}>
                          <span>{d}</span>
                          <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                          </div>
                        </button>

                      )
                    }
                    return <div key={i} className='r-cell' />
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default MonthDates


