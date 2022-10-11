const PersonForm = ({onSubmit, changeNameHandler, changeNumberHandler}) => {
    return <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={changeNameHandler}/>
    </div>
    <div>
      number: <input type="tel" onChange={changeNumberHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

export default PersonForm