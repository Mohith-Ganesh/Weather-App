import {Component} from 'react'
import './App.css';

class WeatherApp extends Component{

  state = {
    city: '', code: false, errorMessage: '', longitude: '', latitude: '', climate: '',
    minTemp: '', maxTemp: '', humidity: '', windSpeed: '', pressure: ''
  }

  onChangeSearchValue = event =>{
    this.setState({city: event.target.value})
  }

  onClickSearch = async event => {
    event.preventDefault()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=80efbd36c65ebf79a5f44ebb0c3ec719`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const {coord, weather, main, wind} = data
    if (data.cod === 200){
      this.setState({longitude: coord.lon})
      this.setState({latitude: coord.lat})
      this.setState({climate: weather[0].description})
      this.setState({minTemp: main.temp_min})
      this.setState({maxTemp: main.temp_max})
      this.setState({humidity: main.humidity})
      this.setState({pressure: main.pressure})
      this.setState({windSpeed: wind.speed})
      this.setState({code: true})
    } else{
      this.setState({ errorMessage: data.message})
      this.setState({code: false})
    }
  }

  render() {
    const {city, code, errorMessage, longitude, latitude, climate, minTemp, maxTemp, humidity,
    pressure, windSpeed} = this.state
    return (
      <div className="container">
        <h1 className="heading">Check Weather Forecast</h1>
        <div>
          <input type="search" placeholder="Enter the city name" className="search-box" value={city} onChange={this.onChangeSearchValue}></input>
          <button type="button" className="search-button" onClick={this.onClickSearch}>Search</button>
        </div>
        <div className="weather-report">
          {code ? <div>
          <p className="data">Co-ordinats of the {city} are : Latitude {latitude} and Longitude {longitude}</p>
          <p className="data">Climate of the {city} is {climate}</p>
          <p className="data">Minimum temperature recorded in the {city} is {minTemp} Fahrenheit</p>
          <p className="data">Maximum temperature recorded in the {city} is {maxTemp} Fahrenheit</p>
          <p className="data">Humidity in the {city} recorded as {humidity}%</p>
          <p className="data">Atmospheric Pressure in the {city} recorded as {pressure} hPa</p>
          <p className="data">Wind Speed recorded in the {city} is {windSpeed} meter/second</p>
          </div> :
        <div>{errorMessage}</div>}
        </div>
      </div>
    )
  }
}

export default WeatherApp;
