import React from 'react'
import Persons from './components/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', id: 0 }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  addName = (event) => {
    event.preventDefault()
    if (this.state.persons.filter((p) =>
      p.name === this.state.newName).length > 0) {
          alert("Nimi on jo luettelossa!")
    }
    else {
      const newPerson = {name: this.state.newName, id: this.state.persons.length}
      const persons = this.state.persons.concat(newPerson)
      this.setState({
        persons,
        newName: ''
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Persons persons={this.state.persons} />
      </div>
    )
  }
}

export default App
