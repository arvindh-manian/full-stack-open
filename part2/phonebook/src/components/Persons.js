const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({personsToShow}) => <div>{personsToShow.map((person) => <Person person={person} key={person.name}></Person>)}</div>

export default Persons