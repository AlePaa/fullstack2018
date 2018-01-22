import React from 'react'
import Person from './Person'
const Persons = ({persons, deletePerson}) => {
  return (
    <div>
    <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person =>
            <Person person={person} key={person.id}
              deletePerson={deletePerson}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default Persons
