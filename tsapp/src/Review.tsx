import  { useState } from "react"

export default function Review(){
    const [ name, SetName] = useState<string | null>('');

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      console.log(event.target.value);
      SetName(event.target.value);
      
    }

    const handSubmit= (event:React.FormEvent<HTMLInputElement>) =>{
      event.preventDefault();
      alert(`Hello ${name} !`);
      SetName('');
    }
  
    // setname은 name을 변경하는건데 15번라인전까지는 name이 값을가지고있다가 SetName('');를 만나서 값이비워진다. 
    return(
    <>
    <form onSubmit={handSubmit}>
    <input type="text" 
          value={name}
          onChange={handleChange}/>
    <input type="submit" value="제출" /> 

    </form>
    </>
  )
}