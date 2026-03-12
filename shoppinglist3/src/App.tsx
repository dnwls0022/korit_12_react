import { useState } from 'react'
import { Container,AppBar, Toolbar,Typography,List,ListItem, ListItemText } from '@mui/material'
import './App.css'
import AddItem from './components/Additem'


export type Item ={
  product: string;
  amount: string;
  price?: number;
}



function App() {
    const [items, setItems] = useState<Item[]>([]);
    const addItem = (item: Item) =>{
    setItems([item, ...items]);
    //0번지에집어넣고싶다 spread연산자 items매개변수로받은아이를 0번지에 기존의 properties를 뒤에배치시킨다.
    //배열로 업데이트해주는것setItems
  }
  return (
    <>
      <Container>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          Shopping list
        </Typography>
      </Toolbar>
    </AppBar>
    <AddItem addItem={addItem} />
    <List>
    {
      items.map((item,index) =>
      <ListItem key={index} divider>
        
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
