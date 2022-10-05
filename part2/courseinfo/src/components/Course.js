const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => <p><strong>total of {parts.reduce((prev, curr,) => curr.exercises + prev, 0)} exercises</strong></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <div>
      {parts.map((part) => <Part key={part.id} part={part}/>)} 
  </div>


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course