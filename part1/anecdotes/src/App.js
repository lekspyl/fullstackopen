import { useState } from 'react'

const VoteDisplay = ({ points, selected }) => {
  let votes = 0
  if (points[selected]) {
    votes = points[selected]
  }
  return (
    <p>This anecdote has {votes} votes</p>
  )
}

const Anecdote = ({ anecdotes, points, selected, showTopAnecdote }) => {
  let anecdoteIndex
  if (showTopAnecdote) {
    anecdoteIndex = points.indexOf(Math.max(...points))
  } else {
    anecdoteIndex = selected
  }
  return <p>{anecdotes[anecdoteIndex]}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState(new Uint8Array(anecdotes.length))

  const generateNextAnecdoteIndex = () => {
    let newIndex = Math.floor(Math.random() * anecdotes.length)
    while (newIndex === selected) {
      newIndex = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newIndex)
  }


  // TODO: think of improving dict population logic
  const voteForAnecdote = () => {
    const copy = [...points]
    if (copy[selected]) {
      copy[selected] += 1
    } else {
      copy[selected] = 1
    }
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <VoteDisplay points={points} selected={selected} />
      <button onClick={generateNextAnecdoteIndex}>Another anecdote</button>
      <button onClick={voteForAnecdote}>Vote</button>
      <h1>Top-rated anecdote</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected} showTopAnecdote={true} />
    </div>
  )
}

export default App
