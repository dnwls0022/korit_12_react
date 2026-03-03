import { useState } from "react";

export default function Mycomponent(){
  const [firstName,setFirstName] = useState('김영');

  return(
    <>
      <div>Hello {firstName}</div>
    </>


  );








}