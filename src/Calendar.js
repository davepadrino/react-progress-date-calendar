import React, { Component } from 'react'
import Header from './Header'
import WeekDays from './WeekDays'
import MonthDates from './MonthDates'
import ReactDOM from 'react-dom';

import './calendar.css'

class Calendar extends Component {
    constructor(props) {
        super(props);
        var date = new Date()
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            selectedYear: date.getFullYear(),
            selectedMonth: date.getMonth(),
            selectedDate: date.getDate(),
            selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            startDay: 0,
            weekNumbers: false,
            minDate: this.props.minDate ? this.props.minDate : null,
            disablePast: this.props.disablePast ? this.props.disablePast : false,
            maxDate: this.props.maxDate ? this.props.maxDate : null,
            disableFuture: this.props.disableFuture ? this.props.disableFuture : false,
            exercises: this.props.exercises ? this.props.exercises : false,
            dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstOfMonth: null,
            daysInMonth: null
        }
    }

    componentWillMount() {
        this.setState(this.calc.call(null, this.state.year, this.state.month));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
            this.props.onSelect.call(ReactDOM.findDOMNode(this), this.state);
        }
    }


    calc = (year, month) => {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth !== month || this.state.selectedYear !== year) {
                this.state.selectedElement.classList.remove('r-selected');
            } else {
                this.state.selectedElement.classList.add('r-selected');
            }
        }
        return {
            firstOfMonth: new Date(year, month, 1),
            daysInMonth: new Date(year, month + 1, 0).getDate()
        };
    }

    getPrev = () => {
        var state = {};
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }
        Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
    }

    getNext = () => {
        var state = {};
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }
        Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
    }

    selectDate = (year, month, date, element) => {
        if (this.state.selectedElement) {
            this.state.selectedElement.classList.remove('r-selected');
        }
        element.target.classList.add('r-selected');
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target
        });
    }

    render() {
        return (
            <div className='r-calendar'>
                <div className='r-inner'>
                    <Header
                        monthNames={this.state.monthNamesFull}
                        month={this.state.month}
                        year={this.state.year}
                        onPrev={this.getPrev}
                        onNext={this.getNext}
                        disablePast={this.state.disablePast}
                        disableFuture={this.state.disableFuture}
                    />
                    <WeekDays
                        dayNames={this.state.dayNames}
                        startDay={this.state.startDay}
                        weekNumbers={this.state.weekNumbers}
                    />
                    <MonthDates
                        month={this.state.month}
                        year={this.state.year}
                        daysInMonth={this.state.daysInMonth}
                        firstOfMonth={this.state.firstOfMonth}
                        startDay={this.state.startDay}
                        onSelect={this.selectDate}
                        weekNumbers={this.state.weekNumbers}
                        disablePast={this.state.disablePast}
                        minDate={this.state.minDate}
                        disableFuture={this.state.disableFuture}
                        maxDate={this.state.maxDate}
                        exercises={this.state.exercises}
                    />
                </div>
            </div>
        )
    }

}


export default Calendar
