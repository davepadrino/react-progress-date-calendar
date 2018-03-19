import React, { Component } from 'react';
import Calendar from './Calendar'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [
        {
          completionDates: 
            {
              '03/15/2018': true,
              '06/15/2018': true
            }
          
        },
        {
          completionDates: 
            {
              '03/15/2018': true,
              '03/18/2018': true
            }
          
        }
      ]
    }
  }


  render() {
    return (
      <div className="App">
        <Calendar
          onSelect={state => {
            console.log(this, state);
          }}
          // disablePast
          disableFuture
          //minDate={new Date(2016, 2, 28)}
          //maxDate={new Date(2018, 2, 28)}
          exercises={this.state.exercises}
        />
      </div>
    );
  }
}

export default App;
