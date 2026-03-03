export default function Hello(firstName,lastName){

  return <h1> Hello   {firstName} {lastName}</h1>;
}

export default function Hello(props){

  return <h1>Hello {props.firstName} {props.lastName}</h1>;
}