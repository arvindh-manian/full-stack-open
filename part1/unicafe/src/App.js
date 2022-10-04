import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ value, label }) => <tr><td>{label}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  if (good === neutral && good === bad && good === 0) {
    return (<div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>)
  }
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good/total * 100

  return (<div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticsLine value={good} label="good"></StatisticsLine>
        <StatisticsLine value={neutral} label="neutral"></StatisticsLine>
        <StatisticsLine value={bad} label="bad"></StatisticsLine>
        <StatisticsLine value={total} label="all"></StatisticsLine>
        <StatisticsLine value={average} label="average"></StatisticsLine>
        <StatisticsLine value={positive + '%'} label="positive"></StatisticsLine>
        </tbody>
    </table>
  </div>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (<div>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good + 1)} text="good"></Button>
    <Button onClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
    <Button onClick={() => setBad(bad + 1)} text="bad"></Button>

    <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
  </div>)
}

export default App