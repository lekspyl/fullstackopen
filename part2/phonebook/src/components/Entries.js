const Entry = ({ person }) => <li>{person.name} {person.phoneNumber}</li>

const Entries = ({ entries }) => {
  return (
    <div>
      <h2>Entries</h2>
      <ul>
        {entries.map(person => <Entry key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default Entries
