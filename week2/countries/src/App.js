import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

class App extends Component {
/*
    Imperfect solution:
      At least Niger cannot be viewed since the App
      doesn't take into consideration countries
      whose names are fully included in other countries'
      names (Nigeria in this case).
*/

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      searchString: ''
    }
  }

  componentWillMount = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data.map(country => {
          return {
            name: country.name,
            native: country.nativeName,
            capital: country.capital,
            population: country.population,
            flag: country.flag,
            alpha2Code: country.alpha2Code
          }
        })
        this.setState({countries})
      })
  }

  handleSearch = (e) => {
    const searchString = e.target.value
    this.setState({searchString})
  }

  handleClick = (searchString) => {
    this.setState({searchString})
  }

  render() {
    const countries = this.state.countries.filter((country) =>
      (country.name.toLowerCase())
        .indexOf(this.state.searchString.toLowerCase()) > -1
    )

    const length = countries.length
    const countryDisplay = (length > 10) ?
      (<p>too many matches, specify another filter</p>) :
      (length === 1) ?
      (<CountryInfo country={countries[0]} />) :
      (<Countries countries={countries} handleClick={this.handleClick} />)

    return (
      <div>
        find countries: <input
          value={this.state.searchString}
          onChange={this.handleSearch} />

          {countryDisplay}
      </div>
    );
  }
}

export default App;
