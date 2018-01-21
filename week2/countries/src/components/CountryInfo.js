import React from 'react'
import './CountryInfo.css'
const CountryInfo = ({country}) => (
  <div>
    <h1>{country.native} {country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} className="flag-image" />
  </div>
)

export default CountryInfo
