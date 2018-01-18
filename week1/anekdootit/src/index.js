import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({anecdote, currentVotes, voteAnecdote, rollAnecdote}) => (
  <div>
    <p>{anecdote}</p>
    <p>has {currentVotes} votes</p>
    <Button handleClick={voteAnecdote} text="vote" />
    <Button handleClick={rollAnecdote} text="next anecdote" />
  </div>
)
const KingOfVotes = ({votes, anecdotes}) => {
  const kingIndex = votes.indexOf(votes.reduce(function(a, b) {
    return Math.max(a, b);
  }))
  const voteKing = anecdotes[kingIndex]
  const kingVotes = votes[kingIndex]

  if (kingVotes === 0) {
    return <div></div>
  }
  return (
    <div>
      <h1>anecdote with most votes:</h1>
      <p>{voteKing}</p>
      <p>has {kingVotes || 0} votes</p>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const length = props.anecdotes.length
    const votes = new Array(length).fill(0)
    this.state = {
      selected: 0,
      votes: votes
    }
  }

  render() {
    const rollAnecdote = () => {
      const newIndex = Math.floor(
        Math.random() * this.props.anecdotes.length
      )
      this.setState({selected: newIndex})
    }
    const voteAnecdote = () => {
      const votes = this.state.votes
      const selected = this.state.selected
      votes[selected] = votes[selected] + 1
      this.setState({votes: votes})
    }
    const anecdote = this.props.anecdotes[this.state.selected]
    const currentVotes = this.state.votes[this.state.selected]

    return (
      <div>
        <Anecdote
          anecdote={anecdote}
          currentVotes={currentVotes}
          rollAnecdote={rollAnecdote}
          voteAnecdote={voteAnecdote}
        />
        <KingOfVotes
          votes={this.state.votes}
          anecdotes={this.props.anecdotes}
        />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
