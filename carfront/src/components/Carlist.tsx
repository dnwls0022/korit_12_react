import { useQuery } from "@tanstack/react-query";
import { CarResponse } from "../Types"
import axios from "axios"

export default function Carlist(){
  //어싱클의 리턴값의 자료형 프롬이스 
  const getCars = async () : Promise<CarResponse[]> => {
    const response = await axios.get('http://localhost:8080/api/vehicles');
// 스프링데이터 리스폰스를 가져왓기에 embedded 가 온것임.
// 
    return response.data._embedded.cars;
  }
//유즈쿼리를쓸거라 객체구조분해사용
  const { data, error, isSuccess} = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,

  });

  if(!isSuccess ){
    return <span> loading...</span>
  }
  else if(error){
    return<span> 오류발생</span>
    //근데 우리는 정상출력결과를보려고하는데 error일때를 굳이써야하나? 오류발생이거 맨밑에 else가 정상출력결과일때를 나타내는거잖아 정상출력결과일때가 나와야하는거라서 error일때 는 거의볼일없을거같은데
    //밑에 data.map에서 위에서 car의 배열데이터에서 값을 가져오는게 정상출력의 결과잖아
  }
  else{
    return(
      <table>
        <tbody>
          {
            data.map((car: CarResponse) =>
              // 
              <tr key={car._links.self.href}>
                <td> {car.brand}</td>
                <td> {car.model}</td>
                <td> {car.color}</td>
                <td> {car.registrationNumber}</td>
                <td> {car.modelYear}</td>
                <td> {car.price}</td>

              </tr>

            )
          }
        </tbody>
      </table>
    )
  }
}