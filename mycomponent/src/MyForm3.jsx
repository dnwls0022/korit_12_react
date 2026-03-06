import { useState } from "react"


export default function MyForm3(){
  // 독립된상태만들어주기
  const[ user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''  
  })
  // 제출했을때 user빼고 적기
  const handleSubmit = event => {
    alert(`Hello ${user.firstName} ${user.lastName} ${user.email}`)
    event.preventDefault();
  }
  // 변경값입력 여긴스프레드라서 한줄만이고 만약 각각에 set단다면
  //  각각의 handleChange 함수를 모두정의해주기
  const handleChange = event =>{
    setUser({...user, [event.target.name]: event.target.value})
  } 
  //(event)=>{setfirstName (event.target.value)}
  //event.target.name
  return(
    <form onSubmit={handleSubmit}>
      <label >username</label> <br />
      <input type="text" name="firstName" 
      onChange={handleChange} value={user.firstName}  /> <br />
      
      <label >lastName</label> <br />
      <input type="text" name="lastName" 
      onChange={handleChange} value={user.lastName} /> <br />
      
      <label >email</label> <br />
      <input type="text" name="email" 
      onChange={handleChange} value={user.email} /> <br />
      
      <input type="submit" />
    </form>
  )
}

// 셋퍼스트네임 셋라스트네임 셋 이메일하고 동일한 작동을하도록 작성 3/6 
