import { useState } from "react"


export default function MyForm3(){
  const[ user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''  
  })

  const handleSubmit = event => {
    alert(`Hello ${user.firstName} ${user.lastName}`)
    event.prevetDefault();
  }

  const handleChange = event =>{
    setUser({...user, [event.target.name]: event.target.value})
  }
  //event.target.name
  return(
    <form onSubmit={handleSubmit}>
      <label >username</label> <br />
      <input type="text" name="firstName" onChange={handleChange} value={user.firstName}  /> <br />
      <label >password</label> <br />
      <input type="password" name="lastName" onChange={handleChange} value={user.lastName} /> <br />
      <label >email</label> <br />
      <input type="text" name="email" onChange={handleChange} value={user.email} /> <br />
      <input type="submit" />
    </form>
  )
}

// 셋퍼스트네임 셋라스트네임 셋 이메일하고 동일한 작동을하도록 작성 3/6 
