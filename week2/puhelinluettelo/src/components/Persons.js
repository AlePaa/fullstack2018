import React from 'react'
import Person from './Person'
const Persons = ({persons}) => {
  return (
    <div>
    <h2>Numerot</h2>
    {persons.map(person =>
      <Person person={person} key={person.id} />)}
    </div>
  )
}

export default Persons
