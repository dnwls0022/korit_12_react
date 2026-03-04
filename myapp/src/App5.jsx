import Drink from "./Drink";
import Hello from "./Hello";
import Mycomponent from "./Mycomponent";
import Mycomponent2 from "./Mycomponent2";
import Mycomponent3 from "./Mycomponent3";


export default function App() {  

  return(
  <>
    
    <Mycomponent3 isLoggedin = {false} />
    <Mycomponent2 isLoggedin = {true} />
    <Mycomponent2 isLoggedin = {false} />

    <Mycomponent></Mycomponent>
    <Drink  drink='coffee'/>
    
    <Hello firstName='Jone ' lastName='Doe'/>  
    <Hello firstName='gildong ' lastName='Hong'/>  
    <Hello firstName='young ' lastName='Kim'/>  
  </>  
  );


}