import { useEffect, useState } from "react";

export default function Counter4(){
  const [count1, setcount1] = useState(0);
  const [count2, setcount2] = useState(0);

  useEffect(() => {console.log('첫번째 랜더링시에만 callback함수가 호출됩니다. 나머지는 안나옴')}, [count1] ,[] );


  return(
    <>
    
    <p>Count : {count1} | {count2}</p>
    <button onClick={()=> setcount1(preValue=>preValue + 1)}>숫자증가1</button>
    
    <br />
    <br />
    <button onClick={()=> setcount2(preValue=>preValue + 1)}>숫자증가2</button>
  </>
  )










}