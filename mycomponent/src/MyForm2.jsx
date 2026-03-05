import { useState } from "react"


export default function Myform2(){
  const [text, setText] = useState('');

  const handleChange = event => {
    console.log(event.target.value);
    setText(event.target.value);
  }

  const handleSubmit = event => {
    alert(`당신은 ${text}라고 말함`)
    event.preventDefault();
  }
  //state let 차이 


  return(
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={text}
      placeholder="내용입력"/>
      <input type="submit" value={'ㅋㅋ'} />
    </form>
  )
}