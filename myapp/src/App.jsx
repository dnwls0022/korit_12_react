import Drink from "./Drink";
import Hello from "./Hello";
import Mycomponent from "./Mycomponent";


export default function App() {  

  return(
  <>
    <Mycomponent></Mycomponent>
    <Drink  drink='coffee'/>
    
    <Hello firstName='Jone ' lastName='Doe'/>  
    <Hello firstName='gildong ' lastName='Hong'/>  
    <Hello firstName='young ' lastName='Kim'/>  
  </>  
  );


}