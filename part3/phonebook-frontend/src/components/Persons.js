const Person = ({ person, deletionCallback }) => {
    return <p>{person.name} {person.number} <button onClick={deletionCallback(person.id)}>delete</button></p>
}

const Persons = ({personsToShow, deletionCallback}) => <div>
        {personsToShow
            .map((person) => <Person person={person} key={person.name} deletionCallback={deletionCallback}>
            </Person>)
        }
    </div>

export default Persons