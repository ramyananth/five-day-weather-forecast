import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import DayInfo from './DayInfo';
import ReactDOM from 'react-dom';

const API_KEY = "22091562d0bdf6867f2d750cb1dbba4e";
var nf = require('node-fetch');
global.location = localStorage.getItem("city, country").split(";");

class App extends Component {
  
  constructor(props) {
    super(props);
    }
    
    state = {
      weather: [],
      index: 0,
      isLoaded: false,
      city:undefined
    }

    handleChange = this.handleChange.bind(this)
    handleSubmit = this.handleSubmit.bind(this)
  
  
  componentDidMount() {
    console.log(this.state.weather);
    this.getData()
  }

  async getData(e) {
    const city = e.target.elements.city.value + "," + e.target.elements.country.value;
    const country = e.target.elements.country.value;
    const urlData = await fetch('api.openweathermap.org/data/2.5/forecast?q={this.state.city}&APPID=${API_KEY}&units=imperial');
    const data = await urlData.json();
    if(city && country) {
      this.setState({
        weather: data.list,
        isLoaded: true,
        city: data.city.name
      })

    if (localStorage.getItem('city, country') !== "") {
      let location = localStorage.getItem('city, country');
      localStorage.setItem('city, country', city + ";" +location);        
   }
   else {
      localStorage.setItem('city, country', city);
   }}
  }

    handleChange(e){
    this.setState({
      city: e.target.city,
    })

    e.preventDefault()
  }

  handleSubmit(e) {
    console.log(e);
    this.setState({ 
      city: this.state.city.value},
       () => {
         this.getData()
    })
    e.preventDefault()
  }

  render() {
    console.log(this.state);
    let weatherDisplay = []
    for (var i = 0; i < 5; i++) {
      weatherDisplay.push(<DayInfo weather={this.state.weather} index={i*8} key={i}/>)
    }

    let location = localStorage.getItem("city, country").split(";");

    let display = ""
    if (this.state.weather) {
    display = this.state.isLoaded ? weatherDisplay : "Data is being pulled."
    } else {
      display = "Error! Please enter a valid location."
    }
  
  return (
    <div className="city">
      <form onSubmit={this.props.onSubmit} >
        <span>Enter City Name:</span>
        &nbsp; 
        <input type="text" onChange={this.props.onChange} value={this.props.city} ref="city" id="city" name = "city"></input>
        <br></br>
        <span>Enter Country Code:</span> 
        &nbsp;
        <input type="text" onChange={this.props.onChange} value={this.props.country} ref="country" id="country" name = "country"></input>
        <button type="submit">Submit</button>
      </form>
    </div>);
  }
}

export default App;