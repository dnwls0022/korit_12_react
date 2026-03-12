import { Container,AppBar, Toolbar,Typography,List,ListItem, ListItemText, Checkbox } from '@mui/material'
import { useState } from 'react'
import './App.css'
//주의
import AddItem from './Additem'


export type Item = {
  dayname: string;
  todo: string;
  time: string;
  done: boolean;
  
}
function App() {
  const [items, setItems] = useState<Item[]>([]);
  const addItem = (item: Item) =>{
    setItems([item, ...items]);
    //배열을 업데이트해주는것setItems
  }

  // 2. 체크박스 클릭 시 해당 항목의 done 상태를 반전시키는 함수 
  const toggleDone = (index: number) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done; // true <-> false 반전
    setItems(newItems);
  }; 




  return (
    <>
    <Container>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          Todo list
        </Typography>
      </Toolbar>
    </AppBar>
    <AddItem addItem={addItem} />
    <List>
    {
      items.map((item,index) =>
      <ListItem key={index} divider>
        <Checkbox 
        checked= {item.done}
        onChange={()=> toggleDone(index)}
        >
        
        </Checkbox>
        <ListItemText 
        primary={item.dayname}
        secondary={`${item.todo} - 시간${item.time}`}
        
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
