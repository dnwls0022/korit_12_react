import { useState } from "react"

export default function Counter2(){

  //초기값 0으로 count1, count2 초기선언
  const [count1, setcount1] = useState(0)
  const [count2, setcount2] = useState(0)
  
  const increment = () => {
    setcount1(count1+1); // 아직 재랜더링이 일어나지않는다
    setcount2(count1+1); // 모든 상태가 업데이트되고 나서 재랜더링된다.

  }

  return(
    <>
      <p>Counters : {count1} | {count2} </p>
      <button onClick={increment}>증가</button> 
    </>
  )
}