import React from 'react'
import Osa from './Osa'

const Sisalto = ({kurssi}) => {
  const osat = kurssi.osat.map(osa =>
    <Osa
      osa={osa.nimi} tehtavia={osa.tehtavia} key={osa.id}
    />
  )

  return(
    <div>
      {osat}
    </div>
  )
}

export default Sisalto
