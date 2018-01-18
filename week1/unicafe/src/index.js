import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick} id={text}>
    {text}
  </button>
)

const Feedback = ({increment}) => (
  <div>
    <h1>anna palautetta</h1>
    <Button handleClick={increment()} text="hyva" />
    <Button handleClick={increment()} text="neutraali" />
    <Button handleClick={increment()} text="huono" />
  </div>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({hyva, neutraali, huono}) => {
  const summa = hyva+huono+neutraali
  const keskiarvo = (hyva - huono)/(summa) ||  0
  const positiivisia = ((hyva / summa) * 100 || 0) +" %"
  if (hyva === 0 && neutraali === 0 && huono === 0) {
    return (<div></div>)
  }
  return (
      <div>
        <h1>statistiikka</h1>
        <table>
          <tbody>
            <Statistic text="hyvä" value={hyva} />
            <Statistic text="neutraali" value={neutraali} />
            <Statistic text="huono" value={huono} />
            <Statistic text="keskiarvo" value={keskiarvo} />
            <Statistic text="positiivisia" value={positiivisia} />
          </tbody>
        </table>
      </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      yhteensa: 0
    }
  }

  increment = () => {
    return (e) => {
      const rating = e.target.id
      this.setState({[rating]: this.state[rating]+1})
    }
  }

  render() {
    return (
      <div>
        <Feedback increment={this.increment} />
        <Statistics
          hyva = {this.state.hyva}
          neutraali = {this.state.neutraali}
          huono = {this.state.huono}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
