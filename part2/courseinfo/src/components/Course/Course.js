import Header from './Header/Header'
import Content from './Content/Content'
import Footer from './Footer/Footer'

const Course = ({ courses }) => {
  return (
    courses.map(course => {
      return (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Footer parts={course.parts} />
        </div>
      )
    })
  )
}

export default Course
