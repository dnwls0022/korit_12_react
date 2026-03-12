// 주석있는 앱 
// 부모 app
import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import './App.css'
// [주의] AddItem 컴포넌트를 가져옵니다. 경로와 대소문자가 정확해야 합니다.
import AddItem from './components/Additem'

// [자료형 정의] 쇼핑 아이템 하나가 가질 데이터의 관상(구조)을 정의합니다. 
// 다른 파일에서도 쓸 수 있게 export를 붙였습니다.
export type Item = {
  product: string;
  amount: string;
}

function App() {
  // [상태 관리] 쇼핑 리스트 전체를 담을 배열입니다. 초기값은 빈 배열([])입니다.
  // <Item[]>는 "이 배열 안에는 Item 타입만 들어올 수 있다"는 뜻입니다.
  const [items, setItems] = useState<Item[]>([]);

  // [데이터 추가 함수] 자식 컴포넌트(AddItem)가 새 아이템을 가져오면 실행될 함수입니다.
  const addItem = (item: Item) => {
    // [불변성 유지] 새로운 아이템을 맨 앞에 두고(...), 기존 아이템들을 그 뒤에 붙여서 새로운 배열을 만듭니다.
    setItems([item, ...items]);
  }

  return (
    <>
      <Container>
        {/* 상단 바 영역 (제목 표시) */}
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              쇼핑목록
            </Typography>
          </Toolbar>
        </AppBar>

        {/* [자식 컴포넌트 호출] addItem 함수를 'addItem'이라는 이름의 배달통(Props)에 담아 보냅니다. */}
        <AddItem addItem={addItem} />

        {/* [리스트 출력 영역] MUI의 List 컴포넌트를 사용합니다. */}
        <List>
          {
            // items 배열을 하나씩 돌면서(map), 각각의 아이템을 ListItem으로 변환합니다.
            items.map((item, index) =>
              // index를 key로 사용하여 리액트가 각각의 항목을 구분하게 합니다. (divider는 밑줄 추가)
              <ListItem key={index} divider>
                {/* primary에는 상품명을 큰 글씨로, secondary에는 수량을 작은 글씨로 표시합니다. */}
                <ListItemText 
                  primary={item.product}
                  secondary={item.amount}
                />
              </ListItem>
            )
          }  
        </List>  
      </Container> 
    </>
  )
}

export default App