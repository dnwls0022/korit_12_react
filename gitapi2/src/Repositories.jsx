//
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Repositories(){
  const getRepositories = async () =>{
    const response = await axios.get('http://api.github.com/search/repositories?q=korit_12')
    return response.data.items;
  }

  const {isLoading, isError, data} = useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositories,
  });

  if(isLoading) return <p>로딩중...()</p>

  if(isError)return <p>오류발생</p>
  else{
    return(
    <table>
      <tbody>
        {
          data.map(repo =>
            <tr key={repo.id}>
              <td>{repo.full_name}</td>

              <td>
                <a href={repo.html_url}>{repo.full_name}의 repository👍</a>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  );  
  }




  
}