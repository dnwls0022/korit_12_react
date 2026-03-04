import HeaderText from "./HeaderText";

export default function Drink({drink}){

  return (
  <>
  <h1>
  would you like drink some {drink}?
  <HeaderText text='추가텍스트'/> 
  </h1>
  </>
  );
}

