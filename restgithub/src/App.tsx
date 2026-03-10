import { useState } from 'react'
import axios from 'axios'
import './App.css'

type Repository = {
  id: number;//고유값필요 인덱스로 표기, 순서바뀌면 고유아니기에.. db에 id로 Pk 나중에 map()을적용했을때 사용
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] =useState<Repository[]>([]); // 제네릭형식으로 Repository넣기 
  const handleClick = () =>{ 
    axios.get<{items: Repository[] }>(`http://api.github.com/search/repositories
      ?q=${keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(error => console.log(error));
  // !!!! ${keyword} 항상 붙여서쓰기 $기호옆에 {} 
  }

  return (
    <>
    <input type="text" onChange={e => setKeyword(e.target.value)} value={keyword} 
    />
    <button onClick={handleClick}>검색</button>
    {repodata.length === 0 ?(
      <p>검색결과가 없음.</p>

    ):(
      <table>
        <tbody>
          {repodata.map(repo => (
            <tr key={repo.id}>
              <td>{repo.full_name}</td>
              <td>
                <a href={repo.html_url}>{repo.html_url}의 리포지토리</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
    }
    </>
  )
}

export default App
