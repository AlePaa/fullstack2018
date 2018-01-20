import React from 'react'
import Person from './Person'
const Persons = ({persons}) => {
  return (
    <div>
    <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person =>
            <Person person={person} key={person.id} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Persons
