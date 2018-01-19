import React from 'react'

const Yhteensa = ({kurssi}) => {
  const yhteensa = kurssi.osat.reduce((a,b)=> a+b.tehtavia,0)

  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
}

export default Yhteensa
