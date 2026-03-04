import Login from "./Login";
import Logout from "./Logout";

export default function Mycomponent3({isLoggedin}){

  return(
    <>
    {isLoggedin ? <Logout/> : <Login/> }
    </>
  )
}