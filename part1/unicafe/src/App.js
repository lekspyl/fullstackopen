import { useState } from 'react'

const Header = () => <div><h1>How would you rate our service?</h1></div>

const Button = (props) => <button onClick={props.clickHandler}>{props.buttonText}</button>

const StatsLine = ({ text, value }) => <tr><td>{text}:</td><td>{value}</td></tr>

const StatsCalculator = ({ rates }) => {
  const totalRates = Object.values(rates).reduce((a, b) => a + b)
  if (totalRates > 0) {
    const avgScore = (rates.good - rates.bad) / totalRates
    const positivePct = (rates.good / totalRates) * 100

    return (
      <table>
        <tbody>
          <StatsLine text='Good' value={rates.good} />
          <StatsLine text='Okay' value={rates.okay} />
          <StatsLine text='Bad' value={rates.bad} />
          <StatsLine text='Average score' value={avgScore.toFixed(2)} />
          <StatsLine text='Total responses' value={totalRates} />
          <StatsLine text='Positive %' value={positivePct.toFixed(2)} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const StatsDisplay = ({ rates }) => {
  return (
    <footer>
      <h2>Statistics</h2>
      <StatsCalculator rates={rates} />
    </footer>
  )
}

const App = () => {
  const [rates, setRate] = useState({
    good: 0,
    okay: 0,
    bad: 0
  })

  const submitGoodRate = () => {
    setRate({
      ...rates,
      good: rates.good + 1
    })
  }

  const submitOkayRate = () => {
    setRate({
      ...rates,
      okay: rates.okay + 1
    })
  }

  const submitBadRate = () => {
    setRate({
      ...rates,
      bad: rates.bad + 1
    })
  }

  return (
    <div>
      <Header />
      <Button clickHandler={submitGoodRate} buttonText='Good' />
      <Button clickHandler={submitOkayRate} buttonText='Okay' />
      <Button clickHandler={submitBadRate} buttonText='Bad' />
      <StatsDisplay rates={rates} />
    </div>
  )
}

export default App
