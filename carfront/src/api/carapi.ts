import { Car, CarResponse } from "../Types";
import axios from "axios";

export const getCars = async () : Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);
    //자바스크립트객체 라서 { }쓰기
// 스프링데이터 리스폰스를 가져왓기에 embedded 가 온것임.
// getcars내에서 localhost 8080을 axios로 불러냄
    return response.data._embedded.cars;
}


// delete
export const deleteCar = async (link: string) =>{
//구현부
  const response = await axios.delete(link);
  //리액트에선 스트링. 요청을 백엔드에서 받으면 링크에 롱 아이디테이블 참조해서 특정로우만참조
  return response.data;

}

//post
export const addCar = async (car:Car)=>{
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/vehicles`, car, {
    headers:{
      'Content-Type': 'application/json'
    },
  });  
  return response.data;

}