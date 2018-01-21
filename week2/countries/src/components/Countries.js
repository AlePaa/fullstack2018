import React from 'react'
import Country from './Country'
const Countries = ({countries, handleClick}) => (
      <table>
        <tbody>
          {countries.map(country =>
            <Country
              country={country}
              key={country.alpha2Code}
              handleClick={handleClick} />)}
        </tbody>
      </table>
)

export default Countries
