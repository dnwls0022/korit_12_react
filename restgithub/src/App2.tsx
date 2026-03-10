import { useState } from 'react'
import axios from 'axios'
import './App.css'

type Repository = {
  id: number;//고유값필요 인덱스로 표기, 순서바뀌면 고유아니기에.. db에 id로 Pk 나중에 map()을적용했을때 사용
  full_name: string;
  html_url: string;
};


// 첫번째 상태 키워드
// 두번째 검색결과
//배열로초기화하고 내부에들어올것을 정헤ㅐ놓겟다


function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] =useState<Repository[]>([]); // 제네릭형식으로 Repository넣기 
  //검색누르면 키워드라는 상태가업데이트가되어야함
  const handleClick = () =>{ 
    //items 내부가 배열이어서 repository 배열
    axios.get<{items: Repository[] }>(`http://api.github.com/search/repositories?q=$
      {keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(error => console.log(error));
  
  }
    // 템플릿리터럴적용으로 백틱.
    //클릭햇을때나와야해서 매개변수없어야함을 표시 () =>

  return (
    <>
    <input type="text" onChange={e => setKeyword(e.target.value)} value={keyword} 
    />
    <button onClick={handleClick}>제출</button>

    </>
  )
}

export default App
