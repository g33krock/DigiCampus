import React, { Component } from "react";
import Sound from "react-sound";

export class AlarmClock extends Component {
    constructor() {
      super();
      this.state = {
        currentTime: '',
        alarmTime1: '07:50:00',
        alarmTime2: '07:55:00',
        alarmTime3: '08:40:00',
        alarmTime4: '08:45:00',
        alarmTime5: '09:30:00',
        alarmTime6: '09:35:00',
        alarmTime7: '10:20:00',
        alarmTime8: '10:25:00',
        alarmTime9: '11:10:00',
        alarmTime10: '11:15:00',
        alarmTime11: '12:00:00',
        alarmTime12: '12:05:00',
        alarmTime13: '12:50:00',
        alarmTime14: '12:55:00',
        alarmTime15: '13:40:00',
        alarmTime16: '13:45:00',
        alarmTime17: '14:30:00',
        alarmTime18: '14:35:00',
        alarmTime19: '15:20:00',
        alarmTime20: '15:25:00',
        alarmTime21: '16:10:00',
      };
      this.setAlarmTime = this.setAlarmTime.bind(this);
    }
  
    componentDidMount(){
      this.clock = setInterval(
        () => this.setCurrentTime(),
        1000
      )
      this.interval = setInterval(
        () => this.checkAlarmClock(),
      1000)
    }
  
    componentWillUnmount(){
      clearInterval(this.clock);
      clearInterval(this.interval);
    }
  
    setCurrentTime(){
      this.setState({
        currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
    }
  
    setAlarmTime(event) {
      event.preventDefault();
      const inputAlarmTimeModified = event.target.value + ':00'
      this.setState({
        alarmTime: inputAlarmTimeModified
      })
      console.log(inputAlarmTimeModified)
    }
  
    checkAlarmClock(){
        if(this.state.currentTime === this.state.alarmTime1 
            || this.state.currentTime === this.state.alarmTime2 
            || this.state.currentTime === this.state.alarmTime3
            || this.state.currentTime === this.state.alarmTime4
            || this.state.currentTime === this.state.alarmTime5
            || this.state.currentTime === this.state.alarmTime6
            || this.state.currentTime === this.state.alarmTime7
            || this.state.currentTime === this.state.alarmTime8
            || this.state.currentTime === this.state.alarmTime9
            || this.state.currentTime === this.state.alarmTime10
            || this.state.currentTime === this.state.alarmTime11
            || this.state.currentTime === this.state.alarmTime12
            || this.state.currentTime === this.state.alarmTime13
            || this.state.currentTime === this.state.alarmTime14
            || this.state.currentTime === this.state.alarmTime15
            || this.state.currentTime === this.state.alarmTime16
            || this.state.currentTime === this.state.alarmTime17
            || this.state.currentTime === this.state.alarmTime18
            || this.state.currentTime === this.state.alarmTime19
            || this.state.currentTime === this.state.alarmTime20
            || this.state.currentTime === this.state.alarmTime20) {
            var a = new Audio("https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/Owl Coo - QuickSounds.com.mp3");
            a.play();
          console.log("alarm") 
    }
}
    render() {
      return (
        <div>
          <h1>React Alarm Clock</h1>
          <h2>It is {this.state.currentTime}.</h2>
          <h2>{this.checkAlarmClock()}</h2>
        </div>
      );
    }
  }
  