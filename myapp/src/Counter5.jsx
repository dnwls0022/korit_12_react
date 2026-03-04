import {useState } from "react";
import useTitle from "./userTitle";


export default function Counter5(){
  const [count, setCount ]= useState(0)
  useTitle(`당신은 ${count} 번 클릭함`);

  
  return(
    <>
    <p>Counter : {count}</p>
    <button onClick={()=> setCount(preValue =>preValue+1)}>increment</button>
    </>
  );
}