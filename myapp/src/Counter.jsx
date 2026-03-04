import { useState } from "react";


export default function Counter(){
  
  const [ count, setCount ] = useState(0);
  
  return (
    
    <div>
      <p>Counter = {count}</p>
      
        <button onClick={()=> setCount(preValue=>preValue + 1)}></button>
        증가
        
    </div>
    
    
  );

}