export default function Myform(){

  const handleSubmit = event =>{
    event.prventDefault(); // 기본동작 방지 새창 x , form 제출이라는 기본동작을 적용
    alert('Form Submit')
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username"/>
      <input type="type" value={'제출'}/>
    </form>
  )
}