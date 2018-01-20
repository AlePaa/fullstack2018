import React from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import AddForm from './components/AddForm'
import Persons from './components/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      searchString: '',
      newName: '',
      newNumber: ''
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        const persons = response.data.persons
        this.setState({persons})
      })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }
  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleSearch = (event) => {
    const searchString = event.target.value
    this.setState({searchString})
  }

  addName = (event) => {
    event.preventDefault()
    if (this.state.persons.filter((p) =>
      p.name === this.state.newName).length > 0) {
          alert("Nimi on jo luettelossa!")
    }
    else {
      const newPerson = {
          name: this.state.newName,
          number: this.state.newNumber,
          id: this.state.persons.length+1
      }
      const persons = this.state.persons.concat(newPerson)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  render() {
    const persons = this.state.persons.filter((person) =>
      (person.name.toLowerCase())
        .indexOf(this.state.searchString.toLowerCase()) > -1
    )

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <SearchForm searchString={this.state.searchString}
          handleSearch={this.handleSearch} />
        <AddForm addName={this.addName}
          newName={this.state.newName} newNumber={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange} />
        <Persons persons={persons} />
      </div>
    )
  }
}

export default App
