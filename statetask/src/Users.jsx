import { useState } from "react"


export default function Users(){
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  //제출
  const handleSubmit = event => {
    alert(`Hello ${username} ${password} ${email}`)
    event.preventDefault();
  }
  //
  /*
  const handleusernameChange = event => {
    setUserName(event.target.value) 
  }

  const handlepasswordChange = event => {
    setPassWord(event.target.value) 
  }

  const handleemailChange = event => {
    setEmail(event.target.value) 
  }
  */


  return(
    <form onSubmit={handleSubmit}>
      <label>username </label> <br />
      <input 
        type="text" 
        value={username} 
        onChange={(event) => setUserName(event.target.value)}
      /> <br />

      <label>password </label> <br />
      <input 
        type="password" 
        value={password} 
        onChange={(event)=> setPassWord(event.target.value) }
      /> <br />
      
      <label>email</label> <br />
      <input 
        type="text" 
        value={email} 
        onChange={(event)=> setEmail (event.target.value) }
      /> <br />
      
      <input type="submit" value="제출" />
    </form>
  )



}