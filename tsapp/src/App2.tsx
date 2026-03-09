
import HelloComponent from './HelloComponent'
import './App.css'
import { useState } from 'react'

function App() {
  const [age, setAge] = useState(0);

  // initialValue 와 다른매개변수호출
  setAge('ten')
  return (
    <>
    <HelloComponent name='김영'  />
    </>
  )
}

export default App
