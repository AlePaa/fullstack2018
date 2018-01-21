import React from 'react'

const Country = ({country, handleClick}) => (
  <tr>
    <td onClick={() => handleClick(country.name)}>
      {country.name}
    </td>
  </tr>
)

export default Country
