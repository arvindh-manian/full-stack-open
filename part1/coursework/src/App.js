const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.class} how are you</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello class="h"/>
      <Hello/>
    </div>
  )
}

export default App