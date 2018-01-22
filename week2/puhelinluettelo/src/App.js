import React from 'react'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      searchString: '',
      newName: '',
      newNumber: '',
      message: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }

  handleNameChange = (event) => {error:
    this.setState({newName: event.target.value})
  }
  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleSearch = (event) => {
    const searchString = event.target.value
    this.setState({searchString})
  }

  displayMessage = (message) => {
    this.setState({message})
    setTimeout(() => {
        this.setState({message: ''})
    }, 3000)
  }

  addName = (event) => {
    event.preventDefault()

    if (this.state.persons.filter((p) =>
      p.name === this.state.newName).length > 0) {
        if (window
          .confirm( this.state.newName + " on jo luettelossa,"+
          " korvataanko vanha numero uudella?")) {
            this.updateNumber(this.state.newName)
          }
          else { alert("nimi on jo luettelossa!") }
    }
    else {
      const person = {
          name: this.state.newName,
          number: this.state.newNumber
      }
      this.addPerson(person)
    }
  }

  addPerson = (person) => {
    personService
      .create(person)
      .then(person => {
        this.setState({
          persons: this.state.persons.concat(person),
          newName: '',
          newNumber: ''
        })
        this.displayMessage('lisättiin ' + person.name)
      })
  }

  deletePerson = (id, name) => {
    if (window.confirm("Poistetaanko "+name+"?")) {
      personService
        .destroy(id)
        .then(() => {
          const persons = this.state.persons.filter(person => person.id !== id)
          this.setState({persons})
          this.displayMessage('poistettiin ' + name)
      })
    }
  }

  updateNumber = (name) => {
    const person = this.state.persons.find(p => p.name === name)
    const changedPerson = {...person, number: this.state.newNumber}
    personService
      .update(person.id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person =>
            person.name !== name ? person : changedPerson),
          newName: '',
          newNumber: '' })
          this.displayMessage('päivitettiin numero henkilölle ' + name)
      })
      .catch(error => {
        if (window.confirm(name +
          " on jo poistettu, lisätäänkö uudella numerolla?")) {
            this.addPerson(changedPerson)
        }
        const persons = this.state.persons.filter(p =>
        p.id !== person.id)
        this.setState({persons})
      })
  }

  render() {
    const persons = this.state.persons.filter((person) =>
      (person.name.toLowerCase())
        .indexOf(this.state.searchString.toLowerCase()) > -1
    )

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.message} />
        <SearchForm searchString={this.state.searchString}
          handleSearch={this.handleSearch} />
        <AddForm addName={this.addName}
          newName={this.state.newName} newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange} />
        <Persons
          persons={persons}
          deletePerson={this.deletePerson}
        />
      </div>
    )
  }
}

export default App
