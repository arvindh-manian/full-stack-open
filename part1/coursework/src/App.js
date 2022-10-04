import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const leftClickHandler = () => {
    setLeft(left + 1)
    setAll(allClicks.concat('L'))
  }
  const rightClickHandler = () => {
    setRight(right + 1)
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      {left}
      <Button onClick={leftClickHandler} text="left"/>
      <Button onClick={rightClickHandler} text="right"/>
      {right}
      <History allClicks={allClicks}></History>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (<div>the app is used by clicking the buttons</div>)
  }

  return <div><p>{allClicks.join(' ')}</p></div>
}

export default App