const Footer = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((x, y) => x + y.exercises, 0)}</p>
  )
}

export default Footer
